/** One completed (or in-progress) kiosk participation, sent to the backend at the end of the game. */
export interface Participation {
  /** Format "123-456" — see idService for generation/validation. */
  id: string;
  name: string;
  email: string;
  points: number;
  attempts: number;
  matchedProducts: string[];
  /** ISO 8601 */
  startedAt: string;
  /** ISO 8601 */
  finishedAt: string;
  /** From VITE_KIOSK_ID (see .env). */
  kioskId: string;
}
