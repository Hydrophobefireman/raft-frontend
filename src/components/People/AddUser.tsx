import { buttonBar, submitButtonBar } from "./People.style";
import { useContext, useState } from "@hydrophobefireman/ui-lib";

import { AnimatedInput } from "../AnimatedInput";
import { FetchUsersContext } from "@/ctx";
import { Form } from "../Form";
import { Modal } from "../Modal";
import { actionButton } from "@/common.styles";
import { css } from "catom";
import { get } from "@/util/http/requests";
import { userRoute } from "@/util/http/routes";

export function AddUser({ close }: { close(): void }) {
  const fetchUsers = useContext(FetchUsersContext);
  const [name, setName] = useState("");
  const [submitted, didSubmit] = useState(false);
  const [error, setError] = useState<string>(null);
  return (
    <Modal close={close}>
      {error && <div class={css({ color: "red" })}>{error}</div>}
      <Form
        onSubmit={async () => {
          if (!name || submitted) return;
          didSubmit(true);
          try {
            await get(userRoute.create(name));
            await fetchUsers();
            close();
          } catch (e) {
            didSubmit(false);
            setError(e.message);
          }
        }}
      >
        <AnimatedInput onInput={setName} labelText="name" value={name} />
        <div class={submitButtonBar}>
          {submitted ? (
            <div>Updating..</div>
          ) : (
            <button title="submit" class={actionButton}>
              submit
            </button>
          )}
        </div>
      </Form>
    </Modal>
  );
}
