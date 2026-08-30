import type { CSSProperties, ReactNode } from "react";

import { C } from "../../styles/theme";

export type ActionButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ActionButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: ActionButtonVariant;
  disabled?: boolean;
  style?: CSSProperties;
  type?: "button" | "submit";
};

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  style,
  type = "button",
}: ActionButtonProps) {
  const palette = {
    primary: { bg: C.turquoise, fg: "#04292A" },
    secondary: { bg: "#fff", fg: C.cobalt, border: `1.5px solid ${C.cobalt}` },
    ghost: { bg: "transparent", fg: C.inkSoft, border: `1px solid ${C.line}` },
    danger: { bg: "#F6E4DF", fg: C.coral, border: `1px solid ${C.coral}` },
  }[variant];

  return (
    <button
      type={type}
      className="lale-btn"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        border: palette.border ?? "none",
        background: palette.bg,
        color: palette.fg,
        borderRadius: 9,
        padding: "9px 14px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontWeight: 700,
        fontSize: 13,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
