import * as landing from "./landing.styles";
import * as styles from "@/common.styles";
/** Exported routes need to be default exports */
export function LandingHeader() {
  return (
    <section class={styles.center}>
      <h1 class={landing.heading}>Raft Graph</h1>
    </section>
  );
}
