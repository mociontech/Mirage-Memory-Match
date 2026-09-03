import { useEffect, useRef } from "react";
import { useFlow } from "../../app/FlowMachine";
import { submitParticipation } from "../../services/participationService";
import { env } from "../../config/env";
import styles from "../screen-placeholder.module.css";

/** Thank-you + accumulated points screen. Submits the finished participation once, on arrival. */
export function Result() {
  const { navigate, session, result } = useFlow();
  const submittedRef = useRef(false);

  useEffect(() => {
    if (submittedRef.current || !result) return;
    submittedRef.current = true;

    submitParticipation({
      id: session.id,
      name: session.name,
      email: session.email,
      points: result.points,
      attempts: result.attempts,
      matchedProducts: result.matchedProducts,
      startedAt: result.startedAt,
      finishedAt: result.finishedAt,
      kioskId: env.kioskId,
    });
  }, [result, session]);

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>¡Gracias por participar!</h1>
      <button className={styles.button} onClick={() => navigate("ranking")}>
        Ver ranking
      </button>
    </div>
  );
}
