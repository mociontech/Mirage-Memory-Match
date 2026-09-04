import { useEffect, useState } from "react";
import { useFlow } from "../../app/FlowMachine";
import { getTop10, type RankingEntry } from "../../services/ranking";
import { ScreenShell } from "../ScreenShell";
import styles from "./Ranking.module.css";

const AUTO_ADVANCE_MS = 7_000;

/**
 * Top 10. Closes the loop back to Welcome — after AUTO_ADVANCE_MS or on the
 * first tap, whichever comes first, so a kiosk session never dead-ends here
 * waiting on the much longer idle-reset timeout (60s, wired in App.tsx).
 * The list never blocks: getTop10() resolves to [] instead of hanging if the
 * backend is unreachable.
 */
export function Ranking() {
  const { reset } = useFlow();
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

  useEffect(() => {
    const timer = setTimeout(reset, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [reset]);

  return (
    <ScreenShell onClick={reset}>
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
