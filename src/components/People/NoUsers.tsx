import { buttonBar, noUsersHeading } from "./People.style";

import { AddUser } from "./AddUser";
import { BoxContainer } from "../BoxContainer";
import { actionButton } from "@/common.styles";
import { useState } from "@hydrophobefireman/ui-lib";

export function NoUsers() {
  const [active, setActive] = useState(false);

  return (
    <div>
      {active && <AddUser close={() => setActive(false)} />}
      <BoxContainer width="80vw">
        <div class={noUsersHeading}>No users found</div>
      </BoxContainer>
      <div class={buttonBar}>
        <button
          title="add user"
          onClick={() => setActive(true)}
          class={actionButton}
        >
          Add User
        </button>
      </div>
    </div>
  );
}
