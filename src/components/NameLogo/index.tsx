import { css } from "catom";

export interface NameLogoProps {
  text: string;
  size?: string;
}
export function NameLogo({ text, size }: NameLogoProps) {
  const val = `${size || "50px"}`;
  return (
    <span
      style={{ height: val, width: val }}
      class={css({
        display: "inline-flex",
        borderRadius: "50%",
        padding: "2px",
        userSelect: "none",
        border: "2px solid var(--current-fg)",
        background: "transparent",
        color: "var(--current-text-color)",
        alignItems: "center",
        transition: "0.2s linear",
        justifyContent: "center",
        pseudo: {
          ":hover": {
            background: "var(--current-alpha)",
          },
          ":focus": { background: "var(--current-alpha)" },
        },
      })}
    >
      <span class={css({ textTransform: "uppercase" })}>
        {getInitials(text).substr(0, 3)}
      </span>
    </span>
  );
}
// const LETTERS_REG = /[A-Z]/;
function getInitials(text: string): string {
  return text
    .split(" ")
    .map(([x]) => x)
    .join("");
}
