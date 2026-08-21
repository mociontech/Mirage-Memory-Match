import styles from "./AttemptsBadge.module.css";

interface AttemptsBadgeProps {
  attempts: number;
}

/** Small pill showing the attempts counter during the game ("Intentos: N"). */
export function AttemptsBadge({ attempts }: AttemptsBadgeProps) {
  return <div className={styles.badge}>Intentos: {attempts}</div>;
}
