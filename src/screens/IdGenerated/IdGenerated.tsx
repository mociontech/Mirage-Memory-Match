import { useFlow } from "../../app/FlowMachine";
import { Button } from "../../components/Button";
import { IdInput, type IdInputValue } from "../../components/IdInput";
import { ScreenShell } from "../ScreenShell";
import styles from "./IdGenerated.module.css";

/** Shows the newly generated participation ID before entering the instructions. */
export function IdGenerated() {
  const { navigate, session } = useFlow();
  const [first = "", second = ""] = session.id.split("-");
  const blocks: IdInputValue = [first, second];

  return (
    <ScreenShell
      actions={<Button onClick={() => navigate("instructions")}>Comenzar</Button>}
    >
      <h1 className={styles.title}>Tu ID único</h1>
      <p className={styles.description}>
        <strong>Este es tu código personal.</strong> Guárdalo, lo necesitarás para iniciar.
      </p>
      <IdInput value={blocks} onChange={() => {}} readOnly />
    </ScreenShell>
  );
}
