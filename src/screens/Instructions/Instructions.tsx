import { useFlow } from "../../app/FlowMachine";
import { Button } from "../../components/Button";
import { PAIRS_COUNT } from "../../game/game.config";
import instructionsIcon from "../../assets/images/instructions-touch.webp";
import { ScreenShell } from "../ScreenShell";
import styles from "./Instructions.module.css";

/**
 * Explains the memory-match rules before the board loads. "Si completas las
 * N" reads off PAIRS_COUNT instead of a hardcoded number in the Figma copy —
 * that number was one of the Fase 0 inconsistencies, resolved to 8 pairs
 * (Colombia board, Figma node 209:862).
 */
export function Instructions() {
  const { navigate } = useFlow();
  return (
    <ScreenShell actions={<Button onClick={() => navigate("game")}>Iniciar</Button>}>
      <img className={styles.icon} src={instructionsIcon} alt="" aria-hidden="true" />
      <h1 className={styles.title}>Instructivo</h1>
      <ul className={styles.list}>
        <li>
          Toca las tarjetas en el tablero para <strong>descubrir objetos.</strong>
        </li>
        <li>
          Por cada coincidencia correcta, <strong>desbloquearás un beneficio</strong> y sumarás
          puntos.
        </li>
        <li>
          Si completas las {PAIRS_COUNT}, <strong>podrás canjear tus puntos</strong> por premios y
          pasar a la siguiente experiencia.
        </li>
      </ul>
    </ScreenShell>
  );
}
