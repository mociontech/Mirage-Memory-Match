import { useFlow } from "../../app/FlowMachine";
import styles from "../screen-placeholder.module.css";

/** Explains the memory-match rules before the board loads. */
export function Instructions() {
  const { navigate } = useFlow();
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Instructivo</h1>
      <button className={styles.button} onClick={() => navigate("game")}>
        Iniciar
      </button>
    </div>
  );
}
