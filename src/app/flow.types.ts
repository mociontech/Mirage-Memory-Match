/**
 * The kiosk flow is linear and closed (no browser back button, no manipulable
 * URLs), so screens are modeled as a state machine instead of routes.
 * "Advertencia" (ID already used) is intentionally NOT a screen here — it is
 * a modal rendered on top of RegisterId, since the design shows it as an
 * overlay with no exit into the game, not a navigable destination.
 */
export type Screen =
  | "welcome"
  | "register"
  | "registerId"
  | "idGenerated"
  | "instructions"
  | "game"
  | "result"
  | "ranking";

/** Participant data collected across Register/RegisterId, carried through the rest of the flow. */
export interface Session {
  id: string;
  name: string;
  email: string;
}

export const EMPTY_SESSION: Session = { id: "", name: "", email: "" };

/** Outcome of the game itself, set once the board finishes and read by Result to submit. */
export interface GameResult {
  points: number;
  attempts: number;
  matchedProducts: string[];
  /** ISO 8601 */
  startedAt: string;
  /** ISO 8601 */
  finishedAt: string;
}

export interface FlowState {
  screen: Screen;
  session: Session;
  result: GameResult | null;
}

export type FlowAction =
  | { type: "NAVIGATE"; screen: Screen }
  | { type: "SET_SESSION"; session: Partial<Session> }
  | { type: "SET_RESULT"; result: GameResult }
  | { type: "RESET" };

export const INITIAL_FLOW_STATE: FlowState = {
  screen: "welcome",
  session: EMPTY_SESSION,
  result: null,
};
