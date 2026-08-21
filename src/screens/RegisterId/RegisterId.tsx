import { useState } from "react";
import { useFlow } from "../../app/FlowMachine";
import styles from "../screen-placeholder.module.css";

/**
 * ID entry screen. "Advertencia" (ID already used) is a local modal, not a
 * flow screen: the design shows it as an overlay with no path into the game.
 * The placeholder Modal here is replaced by the real Modal component in Phase 2/3.
 */
export function RegisterId() {
  const { navigate } = useFlow();
  const [showAdvertencia, setShowAdvertencia] = useState(false);

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Agrega ID</h1>
      <button className={styles.button} onClick={() => navigate("instructions")}>
        Comenzar (ID válido)
      </button>
      <button className={styles.button} onClick={() => setShowAdvertencia(true)}>
        Simular ID ya usado
      </button>

      {showAdvertencia && (
        <div className={styles.screen} style={{ position: "absolute", inset: 0, background: "var(--color-overlay)" }}>
          <p className={styles.title}>Parece que ya participaste en esta experiencia. ¡Gracias!</p>
          <button className={styles.button} onClick={() => setShowAdvertencia(false)}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
