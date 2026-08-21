import { useFlow } from "../../app/FlowMachine";
import styles from "../screen-placeholder.module.css";

/** Shows the newly generated participation ID before entering the instructions. */
export function IdGenerated() {
  const { navigate } = useFlow();
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Tu ID único</h1>
      <button className={styles.button} onClick={() => navigate("instructions")}>
        Comenzar
      </button>
    </div>
  );
}
