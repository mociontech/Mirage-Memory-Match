import { useEffect, useState } from "react";
import { getTop10, type RankingEntry } from "../../services/ranking";
import { ScreenShell } from "../ScreenShell";
import styles from "./Ranking.module.css";

/**
 * Top 10. Dead end by design — the only way out is the idle-reset timeout
 * back to Welcome (wired in App.tsx), matching the kiosk flow. The list
 * never blocks: getTop10() resolves to [] instead of hanging if the
 * backend is unreachable.
 */
export function Ranking() {
  const [entries, setEntries] = useState<RankingEntry[]>([]);

  useEffect(() => {
    let cancelled = false;
    getTop10().then((result) => {
      if (!cancelled) setEntries(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ScreenShell>
      <h1 className={styles.title}>Top 10</h1>
      {entries.length === 0 ? (
        <p className={styles.empty}>Aún no hay resultados para mostrar.</p>
      ) : (
        <ol className={styles.list}>
          {entries.map((entry, index) => (
            <li key={`${entry.name}-${index}`} className={styles.row}>
              <span>
                {index + 1}. {entry.name}
              </span>
              <span>{entry.points} pts</span>
            </li>
          ))}
        </ol>
      )}
    </ScreenShell>
  );
}
