import type { ReactNode } from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: ReactNode;
}

/** The small red pill used for the attempts counter and, in Game, the time remaining. */
export function Badge({ children }: BadgeProps) {
  return <div className={styles.badge}>{children}</div>;
}
