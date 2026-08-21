const USED_IDS_CACHE_KEY = "kam:usedIds";
const VALIDATION_TIMEOUT_MS = 2500;
const BLOCK_LENGTH = 3;

export type IdStatus = "available" | "used";

/** Generates a fresh "123-456"-style participation ID. */
export function generateId(): string {
  const block = () => String(Math.floor(Math.random() * 10 ** BLOCK_LENGTH)).padStart(BLOCK_LENGTH, "0");
  return `${block()}-${block()}`;
}

function readUsedIdsCache(): string[] {
  try {
    const raw = localStorage.getItem(USED_IDS_CACHE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** Remembers an ID locally so a repeat visit is caught even if the backend can't be reached. */
export function rememberUsedId(id: string): void {
  const ids = readUsedIdsCache();
  if (!ids.includes(id)) {
    localStorage.setItem(USED_IDS_CACHE_KEY, JSON.stringify([...ids, id]));
  }
}

/**
 * Checks whether an ID has already participated.
 *
 * TODO(Fase 5): there is no backend yet (see services/api.ts) — this only
 * checks the local kioskId cache and resolves immediately. Once a real
 * endpoint exists, wrap it with the same `Promise.race` timeout pattern
 * shown here (2.5s) so a slow/offline network still falls back to the
 * local cache instead of blocking the participant.
 */
export async function checkIdStatus(id: string): Promise<IdStatus> {
  const localCheck = new Promise<IdStatus>((resolve) => {
    resolve(readUsedIdsCache().includes(id) ? "used" : "available");
  });

  const timeout = new Promise<IdStatus>((resolve) => {
    setTimeout(() => resolve("available"), VALIDATION_TIMEOUT_MS);
  });

  return Promise.race([localCheck, timeout]);
}
