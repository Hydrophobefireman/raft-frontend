import { Modal } from "../Modal";
import { NameLogo } from "../NameLogo";
import { User } from "@/types";
import { UserInfo } from "./UserInfo";
import { card } from "./People.style";
import { useState } from "@hydrophobefireman/ui-lib";

export function UserCard({ data }: { data: User }) {
  const [active, setActive] = useState(false);

  return (
    <>
      {active && (
        <Modal close={() => setActive(false)}>
          <UserInfo data={data} />
        </Modal>
      )}
      <div class={card} onClick={() => setActive(true)}>
        <NameLogo text={data.name} size="2rem" />
        {data.name}
      </div>
    </>
  );
}
