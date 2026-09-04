/**
 * Single source of truth for the board size and game rules. Changing
 * PAIRS_COUNT reconfigures the grid, shuffle, and scoring ceiling with no
 * other file needing to change (acceptance criterion from the spec).
 */

/** Number of matching pairs on the board. Confirmed against Figma: 10 (20 cards, 4x5 grid). */
export const PAIRS_COUNT = 10;

/** How long both cards of a wrong guess stay face-up before flipping back. */
export const MISMATCH_DELAY_MS = 800;

/** Total time budget for one game session; hitting 0 ends the game with whatever score was earned. */
export const GAME_DURATION_MS = 90_000;

export const POINTS_PER_MATCH = 10;
export const PENALTY_PER_MISMATCH = 5;

/** 10 pairs x 10 points = 100, matching the "out of 100" framing on Result. */
export const MAX_SCORE = PAIRS_COUNT * POINTS_PER_MATCH;

/**
 * Derives a near-square column count from the card total instead of
 * hardcoding it, so PAIRS_COUNT alone drives the grid shape. This formula
 * reproduces both grid shapes seen in the Figma file: 20 cards -> 4x5,
 * 16 cards -> 4x4, 12 cards -> 3x4.
 */
export function getGridColumns(totalCards: number): number {
  return Math.max(1, Math.floor(Math.sqrt(totalCards)));
}
