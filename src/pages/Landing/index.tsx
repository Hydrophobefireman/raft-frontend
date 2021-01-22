import { LandingHeader } from "@/components/LandingHeader";
import { People } from "@/components/People";
import { css } from "catom";

/** Exported routes need to be default exports */
export default function Landing() {
  const color = css({ color: "#9e9eff" });
  return (
    <>
      <LandingHeader />
      <People />
      <div class={css({ padding: "2rem" })}>
        rationale behind the{" "}
        <a
          class={color}
          rel="noopener"
          target="_blank"
          href="https://github.com/Hydrophobefireman/raft-backend/blob/master/README.md"
        >
          Backend
        </a>{" "}
        and the{" "}
        <a
          class={color}
          rel="noopener"
          target="_blank"
          href="https://github.com/Hydrophobefireman/raft-frontend/blob/master/README.md"
        >
          frontend
        </a>
      </div>
    </>
  );
}
