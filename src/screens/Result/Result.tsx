import { useFlow } from "../../app/FlowMachine";
import styles from "../screen-placeholder.module.css";

/** Thank-you + accumulated points screen. */
export function Result() {
  const { navigate } = useFlow();
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>¡Gracias por participar!</h1>
      <button className={styles.button} onClick={() => navigate("ranking")}>
        Ver ranking
      </button>
    </div>
  );
}
