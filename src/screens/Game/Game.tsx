import { useRef } from "react";
import { useFlow } from "../../app/FlowMachine";
import styles from "../screen-placeholder.module.css";

/**
 * Board placeholder. Replaced by the real board + useMemoryGame in Phase 4.
 * Already wires real timing into `result` so Result can submit a
 * PARTICIPATION_RESULT-equivalent event once the real score/attempts land here.
 */
export function Game() {
  const { navigate, setResult } = useFlow();
  const startedAtRef = useRef(new Date().toISOString());

  const handleFinish = () => {
    setResult({
      points: 0,
      attempts: 0,
      matchedProducts: [],
      startedAt: startedAtRef.current,
      finishedAt: new Date().toISOString(),
    });
    navigate("result");
  };

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Tablero (placeholder)</h1>
      <button className={styles.button} onClick={handleFinish}>
        Terminar partida
      </button>
    </div>
  );
}
