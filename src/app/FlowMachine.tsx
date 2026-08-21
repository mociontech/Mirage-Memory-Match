import { createContext, useContext, useReducer, type ReactNode } from "react";
import {
  INITIAL_FLOW_STATE,
  type FlowAction,
  type FlowState,
  type Screen,
} from "./flow.types";

function flowReducer(_state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case "NAVIGATE":
      return { screen: action.screen };
    case "RESET":
      return INITIAL_FLOW_STATE;
  }
}

interface FlowContextValue {
  screen: Screen;
  /** Move to a new screen. */
  navigate: (screen: Screen) => void;
  /** Return to Welcome and clear all session/flow state (idle timeout, kiosk reset). */
  reset: () => void;
}

const FlowContext = createContext<FlowContextValue | null>(null);

/** Provides the screen-navigation state machine to the whole app. */
export function FlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(flowReducer, INITIAL_FLOW_STATE);

  const value: FlowContextValue = {
    screen: state.screen,
    navigate: (screen) => dispatch({ type: "NAVIGATE", screen }),
    reset: () => dispatch({ type: "RESET" }),
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

/** Reads and controls the current screen. Must be used under FlowProvider. */
export function useFlow(): FlowContextValue {
  const ctx = useContext(FlowContext);
  if (!ctx) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return ctx;
}
