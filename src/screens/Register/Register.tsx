import { useFlow } from "../../app/FlowMachine";
import styles from "../screen-placeholder.module.css";

/** Name + email capture, or a link into RegisterId to resume with an existing ID. */
export function Register() {
  const { navigate } = useFlow();
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>REGISTRO</h1>
      <button className={styles.button} onClick={() => navigate("idGenerated")}>
        Comenzar
      </button>
      <button className={styles.button} onClick={() => navigate("registerId")}>
        ó Digita ID
      </button>
    </div>
  );
}
