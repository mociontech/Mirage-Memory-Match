import { useEffect, useRef } from "react";
import { useFlow } from "../../app/FlowMachine";
import { Button } from "../../components/Button";
import { rememberUsedEmail, rememberUsedId } from "../../services/idService";
import { enqueueParticipation } from "../../services/outbox";
import type { Participation } from "../../types/participation";
import { ScreenShell } from "../ScreenShell";
import styles from "./Result.module.css";

/** Thank-you + accumulated points. Writes the outbox entry once, on arrival. */
export function Result() {
  const { navigate, session } = useFlow();
  const submitted = useRef(false);

  useEffect(() => {
    if (submitted.current) return;
    submitted.current = true;

    rememberUsedId(session.id);
    if (session.email) rememberUsedEmail(session.email);

    const participation: Participation = {
      id: session.id,
      name: session.name,
      email: session.email,
      points: session.score,
      attempts: session.attempts,
      matchedProducts: session.matchedProducts,
      startedAt: session.startedAt,
      finishedAt: session.finishedAt,
      kioskId: import.meta.env.VITE_KIOSK_ID,
    };
    enqueueParticipation(participation);
  }, [session]);

  return (
    <ScreenShell actions={<Button onClick={() => navigate("ranking")}>Ver ranking</Button>}>
      <h1 className={styles.title}>¡Gracias por participar!</h1>
      <p className={styles.points}>ACUMULASTE {session.score} PUNTOS</p>
    </ScreenShell>
  );
}
