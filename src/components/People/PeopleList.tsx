import { actionButton, bold } from "@/common.styles";
import { buttonBar, cardBox } from "./People.style";
import { useContext, useState } from "@hydrophobefireman/ui-lib";

import { AddRelation } from "./AddRelation";
import { AddUser } from "./AddUser";
import { BoxContainer } from "../BoxContainer";
import { ConnectionGraphViewer } from "./ConnectionViewer";
import { NoUsers } from "./NoUsers";
import { UserCard } from "./UserCard";
import { UsersContext } from "@/ctx";
import { css } from "catom";

export function PeopleList() {
  const users = useContext(UsersContext);
  const [addUserToggle, setAddUsers] = useState(false);
  const [addRelationToggle, setAddRelation] = useState(false);
  if (!users.length) return <NoUsers />;
  return (
    <div>
      {addRelationToggle && <AddRelation close={() => setAddRelation(false)} />}
      {addUserToggle && <AddUser close={() => setAddUsers(false)} />}
      <BoxContainer>
        <div>
          People you've added:{" "}
          {users && users.length && (
            <div class={css({ fontSize: "0.7rem" })}>
              (click on them to view all of their connections)
            </div>
          )}
        </div>
        <div class={cardBox}>
          {users.map((x) => (
            <UserCard data={x} />
          ))}
        </div>
      </BoxContainer>
      <div class={buttonBar}>
        <button
          title="add user"
          class={actionButton}
          onClick={() => setAddUsers(true)}
        >
          Add user
        </button>
        <button
          title="add relation"
          class={actionButton}
          onClick={() => setAddRelation(true)}
        >
          Add relation
        </button>
      </div>
      {users.length > 1 ? (
        <ConnectionGraphViewer users={users} />
      ) : (
        <div> Add another user to view connections </div>
      )}
    </div>
  );
}
