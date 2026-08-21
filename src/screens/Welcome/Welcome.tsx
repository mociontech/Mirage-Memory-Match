import { useFlow } from "../../app/FlowMachine";
import styles from "../screen-placeholder.module.css";

/** Landing screen: brand splash + CTA into Register. */
export function Welcome() {
  const { navigate } = useFlow();
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>KICK AND MATCH</h1>
      <button className={styles.button} onClick={() => navigate("register")}>
        Iniciar
      </button>
    </div>
  );
}
