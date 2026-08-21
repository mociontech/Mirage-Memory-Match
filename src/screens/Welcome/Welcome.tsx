import { useFlow } from "../../app/FlowMachine";
import { Button } from "../../components/Button";
import logoMark from "../../assets/images/logo-mark.svg";
import { ScreenShell } from "../ScreenShell";
import styles from "./Welcome.module.css";

/** Landing screen: brand splash + CTA into Register. Uses the small mark, not the full wordmark. */
export function Welcome() {
  const { navigate } = useFlow();
  return (
    <ScreenShell showLogo={false} actions={<Button onClick={() => navigate("register")}>Iniciar</Button>}>
      <img className={styles.mark} src={logoMark} alt="Mirage" />
      <h1 className={styles.title}>
        <span className={styles.titleTop}>KICK</span>
        <span className={styles.titleBottom}>AND MATCH</span>
      </h1>
      <p className={styles.tagline}>frase inicial de marca</p>
    </ScreenShell>
  );
}
