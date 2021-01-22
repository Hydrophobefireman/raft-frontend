import { useContext, useState } from "@hydrophobefireman/ui-lib";

import { AnimatedInput } from "../AnimatedInput";
import { User } from "@/types";
import { UsersContext } from "@/ctx";
import { css } from "catom";
import { findUser } from "@/util/findUser";
import { post } from "@/util/http/requests";
import { useMount } from "@/customHooks";
import { userRoute } from "@/util/http/routes";

export function UserInfo({ data }: { data: User }) {
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState(null);
  const [error, setError] = useState(null);
  useMount(async () => {
    setLoading(true);
    try {
      const res = await post(userRoute.usersById, { body: { users: [data._id] } });

      setConnections(findUser(data._id, res).connections);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  });
  return (
    <div>
      {error && <div class={css({ color: "red" })}>{error}</div>}
      <AnimatedInput
        onInput={null}
        disabled={true}
        value={data.name}
        labelText="name"
      />
      <div>
        {loading ? (
          "Fetching user connections.."
        ) : (
          <Connections connections={connections} />
        )}
      </div>
    </div>
  );
}

function Connections({
  connections,
}: {
  connections: User["connections"];
}): any {
  const allUsers = useContext(UsersContext);
  if (!(connections && connections.length))
    return <div>No connections found</div>;
  return (
    <div>
      <ul class={css({ fontSize: "1.1rem", marginTop: "10px" })}>
        {(connections || []).map((x) => (
          <li>
            <b>{x.relation}</b> of {findUser(x.id, allUsers).name}
          </li>
        ))}
      </ul>
    </div>
  );
}
