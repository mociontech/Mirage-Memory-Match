import { useEffect, useState } from "react";
import logoMark from "../../assets/images/logo-mark.svg";
import type { Product } from "../../game/products";
import styles from "./Card.module.css";

interface CardProps {
  isFlipped: boolean;
  isMatched: boolean;
  product: Product | undefined;
  onTap: () => void;
}

const FACE_UP_COLORS = [
  "#e4032c",
  "#333333",
  "#848484",
  "#ff006a",
  "#a81780",
  "#00dad7",
] as const;

function faceUpColorFor(productId: string): string {
  let hash = 0;
  for (const char of productId) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return FACE_UP_COLORS[hash % FACE_UP_COLORS.length]!;
}

/** One board tile: flips with transform/backface-visibility only (no layout-affecting animation). */
export function Card({ isFlipped, isMatched, product, onTap }: CardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, [isFlipped]);

  return (
    <button
      type="button"
      className={styles.outer}
      onClick={onTap}
      disabled={isFlipped || isMatched}
      aria-label={isFlipped || isMatched ? (product?.name ?? "carta") : "Carta boca abajo"}
    >
      <div
        className={`${styles.inner} ${isFlipped || isMatched ? styles.flipped : ""} ${isMatched ? styles.matched : ""}`}
        data-animating={isAnimating}
        onTransitionEnd={() => setIsAnimating(false)}
      >
        <div className={`${styles.face} ${styles.faceDown}`}>
          <img className={styles.faceDownIcon} src={logoMark} alt="" aria-hidden="true" />
        </div>
        <div
          className={`${styles.face} ${styles.faceUp}`}
          style={{ background: product ? faceUpColorFor(product.id) : undefined }}
        >
          {product?.name}
        </div>
      </div>
    </button>
  );
}
