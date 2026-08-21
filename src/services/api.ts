import type { Participation } from "../types/participation";

export interface RankingEntry {
  name: string;
  points: number;
}

/**
 * The single outbound interface the rest of the app talks to. No real
 * endpoint exists yet (Fase 0 decision), so this fans out to Data Hub +
 * ranking DB directly from the client, gated behind env vars — once a real
 * edge function exists, only this file changes, pointed at that one URL.
 */
const DATA_HUB_URL = import.meta.env.VITE_DATA_HUB_URL;
const RANKING_DB_URL = import.meta.env.VITE_RANKING_DB_URL;

async function postParticipation(url: string, participation: Participation): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Same ID for every retry of the same participation, so a double
      // flush from the outbox can't create duplicate records server-side.
      "Idempotency-Key": participation.id,
    },
    body: JSON.stringify(participation),
  });
}

/**
 * Sends one participation to every configured destination. Throws if any
 * destination is unreachable or unconfigured — outbox.ts is what decides
 * what to do about that (retry later), this function never swallows errors.
 */
export async function submitParticipation(participation: Participation): Promise<void> {
  if (!DATA_HUB_URL || !RANKING_DB_URL) {
    throw new Error(
      "submitParticipation: VITE_DATA_HUB_URL / VITE_RANKING_DB_URL are not configured yet",
    );
  }
  const [dataHubRes, rankingRes] = await Promise.all([
    postParticipation(DATA_HUB_URL, participation),
    postParticipation(RANKING_DB_URL, participation),
  ]);
  if (!dataHubRes.ok || !rankingRes.ok) {
    throw new Error("submitParticipation: a destination responded with a non-2xx status");
  }
}

/** Top 10 for the Ranking screen. Returns an empty list if unconfigured or unreachable — never throws. */
export async function fetchRanking(): Promise<RankingEntry[]> {
  if (!RANKING_DB_URL) return [];
  try {
    const res = await fetch(`${RANKING_DB_URL}/top10`);
    if (!res.ok) return [];
    return (await res.json()) as RankingEntry[];
  } catch {
    return [];
  }
}
