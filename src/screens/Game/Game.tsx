import { useEffect, type CSSProperties } from "react";
import { useFlow } from "../../app/FlowMachine";
import { useMemoryGame } from "../../game/useMemoryGame";
import { PRODUCTS } from "../../game/products";
import { AttemptsBadge } from "../../components/AttemptsBadge";
import { Badge } from "../../components/Badge";
import { ProductPopup } from "../../components/ProductPopup";
import { Logo } from "../../components/Logo";
import { Card } from "./Card";
import styles from "./Game.module.css";

/** Board screen: wires useMemoryGame to the UI, nothing here owns game rules. */
export function Game() {
  const { navigate, setSession } = useFlow();
  const {
    cards,
    phase,
    attempts,
    score,
    gridColumns,
    timeRemainingMs,
    matchedProductIds,
    lastMatchedProduct,
    flipCard,
    acknowledgeMatch,
  } = useMemoryGame();

  // Intentionally run-once: useFlow() returns a fresh setSession on every
  // render, so including it here would re-stamp startedAt on every render.
  useEffect(() => {
    setSession({ startedAt: new Date().toISOString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === "finished" && !lastMatchedProduct) {
      setSession({
        score,
        attempts,
        matchedProducts: matchedProductIds,
        finishedAt: new Date().toISOString(),
      });
      navigate("result");
    }
  }, [phase, lastMatchedProduct, score, attempts, matchedProductIds, navigate, setSession]);

  const gridRows = Math.ceil(cards.length / gridColumns);
  const secondsRemaining = Math.ceil(timeRemainingMs / 1000);

  return (
    <div className={styles.shell}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.badges}>
        <AttemptsBadge attempts={attempts} />
        <Badge>{secondsRemaining}s</Badge>
      </div>
      <div className={styles.boardWrap}>
        <div
          className={styles.board}
          style={{ "--grid-columns": gridColumns, "--grid-rows": gridRows } as CSSProperties}
        >
          {cards.map((card) => (
            <Card
              key={card.id}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              product={PRODUCTS.find((p) => p.id === card.productId)}
              onTap={() => flipCard(card.id)}
            />
          ))}
        </div>
      </div>

      <ProductPopup
        open={lastMatchedProduct !== null}
        onClose={acknowledgeMatch}
        copy={lastMatchedProduct?.popupCopy ?? ""}
      />
    </div>
  );
}
