import { useFlow } from "../../app/FlowMachine";
import styles from "../screen-placeholder.module.css";

/** Board placeholder. Replaced by the real board + useMemoryGame in Phase 4. */
export function Game() {
  const { navigate } = useFlow();
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Tablero (placeholder)</h1>
      <button className={styles.button} onClick={() => navigate("result")}>
        Terminar partida
      </button>
    </div>
  );
}
