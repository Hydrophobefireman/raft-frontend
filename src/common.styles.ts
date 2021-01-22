import { css } from "catom";
export const center = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const mask = css({
  height: "100vh",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(48,48,48,0.8)",
  position: "fixed",
  width: "100vw",
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  zIndex: 5,
});

export const modal = css({
  boxShadow: "var(--box-shadow)",
  background: "var(--current-bg)",
  width: "70%",
  maxWidth: "450px",
  padding: "2rem",
  borderRadius: "10px",
  animation: "scale_anim 0.1s linear",
  animationFillMode: "forwards",
  overflowY: "auto",
});

export const bold = css({ fontWeight: "bold" });

export const actionButton = css({
  display: "inline-flex",
  alignContent: "center",
  fontSize: "1.1rem",
  color: "var(--current-fg)",
  background: "transparent",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  marginLeft: "0.5rem",
  marginRight: "0.5rem",
  transition: "0.3s linear",
  pseudo: {
    ":hover": { background: "var(--current-alpha)" },
    ":focus": { background: "var(--current-alpha)" },
  },
});
export const cancelButton = [
  css({
    // @ts-ignore
    "--current-alpha": "#e8343499",
    "--current-fg": "red",
  }),
  actionButton,
].join(" ");

export const hoverable = css({
  pseudo: {
    ":not([disabled])": {
      cursor: "pointer",
      transition: "0.3s ease-in-out",
      transformStyle: "preserve-3d",
    },
    ":active:not([disabled])": {
      transform: "perspective(1px) scale(1.048) translateZ(0)",
    },
    ":focus:not([disabled])": {
      transform: "perspective(1px) scale(1.048) translateZ(0)",
    },
    ":hover:not([disabled])": {
      transform: "perspective(1px) scale(1.048) translateZ(0)",
    },
  },
});
