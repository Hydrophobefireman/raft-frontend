import { actionButton, bold, center, hoverable } from "@/common.styles";

import { css } from "catom";

export const noUsersHeading = [bold, css({ fontSize: "1.4rem" })];

const baseButtonBar = css({
  display: "flex",
  alignItems: "center",
});
export const buttonBar = [
  baseButtonBar,
  css({
    justifyContent: "flex-end",
    padding: "1rem",
    maxWidth: "75vw",
    margin: "auto",
  }),
].join(" ");
export const submitButtonBar = [baseButtonBar, css({ marginTop: "15px" })].join(
  " "
);

export const card = [
  css({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    wordBreak: "break-word",
    flexDirection: "column",
    boxShadow: "var(--box-shadow)",
    height: "100px",
    width: "100px",
    borderRadius: "5px",
    cursor: "pointer",
    padding: ".7rem",
    textAlign: "center",
    margin: "5px",
  }),
  hoverable,
].join(" ");

export const cardBox = css({
  display: "flex",
  justifyContent: "space-evenly",
  marginTop: "20px",
  flexWrap: "wrap",
});

export const select = css({
  minWidth: "60%",
  padding: ".5rem",
  outline: "none",
  fontWeight: "bold",
  background: "var(--current-bg)",
  color: "#fff",
  border: "2px solid var(--current-alpha)",
  borderRadius: "5px",
});

export const connectionSubmitButton = [
  actionButton,
  css({ marginTop: "1rem", marginBottom: "2rem" }),
].join(" ");

export const graphViewerBox = [
  css({ marginTop: "30px", flexDirection: "column" }),
  center,
].join(" ");

export const viewConnectionsHeading = [bold, css({ fontSize: "1.5rem" })].join(
  " "
);

export const formContainer = css({
  width: "80vw",
  margin: "auto",
  textAlign: "center",
});

export const chartViewer = css({
  background: "var(--current-bg)",
  position: "fixed",
  height: "100vh",
  width: "100vw",
  top: "0",
  transition: "0.3s linear",
  zIndex: 1,
  overflowY: "auto",
});

export const chartViewerInactive = css({ transform: "translateY(100vh)" });

export const dataGroup = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  maxWidth: "80vw",
  margin: "auto",
});

export const viewerInstanceBox = css({
  padding: "2rem",
  margin: "auto",
  width: "70vw",
  border: "2px solid var(--current-alpha)",
  marginTop: "30px",
  borderRadius: "10px",
  media: {
    "(max-width:500)": {
      height: "80vh",
      width: "90vw",
    },
  },
});
