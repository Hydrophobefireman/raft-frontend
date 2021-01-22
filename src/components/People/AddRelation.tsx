import { FetchUsersContext, UsersContext } from "@/ctx";
import { actionButton, bold, cancelButton } from "@/common.styles";
import { useContext, useEffect, useState } from "@hydrophobefireman/ui-lib";

import { AnimatedInput } from "../AnimatedInput";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { OptionGroup } from "./OptionGroup";
import { css } from "catom";
import { post } from "@/util/http/requests";
import { select } from "./People.style";
import { userRoute } from "@/util/http/routes";

export function AddRelation({
  close,
  from: _from,
}: {
  close(): void;
  from?: string;
}) {
  const [from, setFrom] = useState(_from);
  const [to, setTo] = useState(null);
  const [relation, setRelation] = useState("");
  const [createNew, setCreateNew] = useState(false);
  const [newUserName, setNewUserName] = useState(null);
  const allUsers = useContext(UsersContext);
  const fetchUsers = useContext(FetchUsersContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => setFrom(_from), [_from]);

  async function submit() {
    if (loading) return;
    setError(null);
    setLoading(true);
    if (
      !from ||
      (!to && !(newUserName && newUserName.trim())) ||
      !relation.trim()
    )
      return;
    // we do undefined here as JSON.stringify will remove it for us
    const obj = {
      protagonistId: from,
      relation: relation.trim(),
      relative: {
        relativeId: to || undefined,
        relativeName: (newUserName && newUserName.trim()) || undefined,
      },
    };
    try {
      await post(userRoute.addConnection, { body: obj });
      fetchUsers();
      close();
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }
  return (
    <Modal close={close}>
      <Form onSubmit={submit}>
        <div class={bold}>Add a new relation</div>
        {error && <div class={css({ color: "red" })}>error</div>}
        <div>
          <div>user 1:</div>
          <label for="user-1-select" class="sr-only">
            select user 1
          </label>
          <select
            id="user-1-select"
            onInput={(e) => setFrom(e.currentTarget.value)}
            class={select}
          >
            <OptionGroup allUsers={allUsers} curr={from} other={to} />
          </select>
        </div>
        <div>
          <div>user 2:</div>
          {createNew ? (
            <div class={css({ marginTop: "1rem" })}>
              <AnimatedInput
                value={newUserName}
                onInput={setNewUserName}
                labelText="name"
              />
              <button
                title="cancel"
                class={cancelButton}
                onClick={() => {
                  setNewUserName(null);
                  setCreateNew(false);
                }}
              >
                cancel
              </button>
            </div>
          ) : (
            <>
              <label for="user-2-select" class="sr-only">
                select user 2
              </label>
              <select
                id="user-2-select"
                class={select}
                onInput={(e) => setTo(e.currentTarget.value)}
              >
                <OptionGroup allUsers={allUsers} curr={to} other={from} />
              </select>{" "}
              <span>or</span>
              <button
                type="button"
                class={actionButton}
                onClick={() => {
                  setCreateNew(true);
                  setTo(null);
                }}
              >
                create new user
              </button>
            </>
          )}
        </div>
        <div class={css({ marginTop: "15px" })}>
          <AnimatedInput
            onInput={setRelation}
            value={relation}
            labelText="relation"
          />
        </div>
        <div class={css({ marginTop: "10px" })}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <button
                title="cancel"
                onClick={close}
                type="button"
                class={cancelButton}
              >
                cancel
              </button>
              <button title="submit" class={actionButton}>
                submit
              </button>
            </>
          )}
        </div>
      </Form>
    </Modal>
  );
}
