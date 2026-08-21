import { fetchRanking, type RankingEntry } from "./api";

export type { RankingEntry };

/**
 * Ranking screen never blocks on the network (hard constraint #5): an
 * unreachable/unconfigured backend just means an empty board, not a stuck
 * spinner — fetchRanking() already resolves to [] instead of throwing.
 */
export async function getTop10(): Promise<RankingEntry[]> {
  return fetchRanking();
}
