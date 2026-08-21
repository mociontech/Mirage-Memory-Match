import styles from "../screen-placeholder.module.css";

/**
 * Top 10 ranking. Dead end by design — the only way out is the idle-reset
 * timeout back to Welcome (wired in App.tsx), matching the kiosk flow.
 */
export function Ranking() {
  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>Top 10</h1>
    </div>
  );
}
