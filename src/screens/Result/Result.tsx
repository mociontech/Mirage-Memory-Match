import { useEffect, useRef } from "react";
import { useFlow } from "../../app/FlowMachine";
import { BrandFrame } from "../../components/BrandFrame";
import { Footer } from "../../components/Footer";
import { Logo } from "../../components/Logo";
import { rememberUsedEmail, rememberUsedId } from "../../services/idService";
import { enqueueParticipation } from "../../services/outbox";
import type { Participation } from "../../types/participation";
import styles from "./Result.module.css";

const AUTO_ADVANCE_MS = 7_000;

/**
 * Thank-you + accumulated points. Writes the outbox entry once, on arrival.
 * No button in Figma - the whole card advances to Ranking, on tap or after
 * AUTO_ADVANCE_MS, same dead-end pattern as Ranking itself. Positioned to
 * match Figma (node 209:763, 1080x1920) exactly — every
 * left/top/width/height/font-size is `(figma_px / 1920) * 100`vh, same
 * conversion as every other screen (see the comment in Welcome.tsx for why
 * that's exact on this aspect-locked shell).
 */
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

  useEffect(() => {
    const timer = setTimeout(() => navigate("ranking"), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.shell} onClick={() => navigate("ranking")}>
      <BrandFrame />
      <div className={styles.logo}>
        <Logo />
      </div>
      <h1 className={styles.title}>¡Gracias por participar!</h1>
      <div className={styles.scoreBox}>{Math.round(session.score)}</div>
      <p className={styles.label}>Acumulaste</p>
      <Footer />
    </div>
  );
}
