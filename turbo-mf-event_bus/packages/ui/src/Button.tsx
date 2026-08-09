import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const styles = {
    primary: { background: "#111", color: "#fff" },
    secondary: { background: "#eee", color: "#111" },
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: "8px 16px",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
