import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./TextField.module.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode;
}

/** Bordered pill input with a leading icon, used for Nombre/Correo in Register. */
export function TextField({ icon, autoComplete = "off", ...props }: TextFieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <input className={styles.input} autoComplete={autoComplete} {...props} />
    </label>
  );
}
