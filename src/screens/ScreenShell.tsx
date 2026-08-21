import type { ReactNode } from "react";
import { BrandFrame } from "../components/BrandFrame";
import { Logo } from "../components/Logo";
import styles from "./ScreenShell.module.css";

interface ScreenShellProps {
  /** Centered title/body content — grows to fill available space. */
  children: ReactNode;
  /** Buttons/links pinned near the bottom, in Figma's usual button position. */
  actions?: ReactNode;
  /** The Instructions/Advertencia screens omit the logo in favor of other art. */
  showLogo?: boolean;
}

/** The BrandFrame + Logo + gradient background shared by every kiosk screen. */
export function ScreenShell({ children, actions, showLogo = true }: ScreenShellProps) {
  return (
    <div className={styles.shell}>
      <BrandFrame />
      {showLogo && <div className={styles.logo}><Logo /></div>}
      <div className={styles.content}>{children}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
