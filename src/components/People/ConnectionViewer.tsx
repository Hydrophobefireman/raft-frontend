import { actionButton, center } from "@/common.styles";
import {
  chartViewer,
  chartViewerInactive,
  connectionSubmitButton,
  dataGroup,
  formContainer,
  graphViewerBox,
  select,
  viewConnectionsHeading,
  viewerInstanceBox,
} from "./People.style";
import { useEffect, useState } from "@hydrophobefireman/ui-lib";

import { Form } from "../Form";
import { NameLogo } from "../NameLogo";
import { OptionGroup } from "./OptionGroup";
import { User } from "@/types";
import { css } from "catom";
import { findUser } from "@/util/findUser";
import { get } from "@/util/http/requests";
import { graphRoute } from "@/util/http/routes";

interface ConnData {
  id: string;
  relation?: string;
  name?: string;
}

export function ConnectionGraphViewer({ users }: { users: User[] }) {
  const [from, setFrom] = useState<string>(null);
  const [to, setTo] = useState<string>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);
  const [chart, setChart] = useState(null);
  async function submit() {
    if (!from || !to || loading) return;
    setLoading(true);
    setError(null);
    try {
      const ret = await get(graphRoute.affinity(from, to));
      if (!ret.length) {
        setError("No connections found");
        setLoading(false);
        return;
      }
      setChart(ret);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }
  const close = () => setChart(null);

  return (
    <div class={graphViewerBox}>
      <ChartViewer data={chart} close={close} users={users} />
      <div class={viewConnectionsHeading}>View connections</div>
      <div class={formContainer}>
        {error && <div class={css({ color: "red" })}>{error}</div>}
        <Form onSubmit={submit}>
          <div>
            <div>user 1:</div>
            <label for="user-1-select-cv" class="sr-only">
              select user 1
            </label>
            <select
              id="user-1-select-cv"
              onInput={(e) => setFrom(e.currentTarget.value)}
              class={select}
            >
              <OptionGroup allUsers={users} curr={from} other={to} />
            </select>
          </div>
          <div>
            <div>user 2:</div>
            <label for="user-2-select-cv" class="sr-only">
              select user 2
            </label>
            <select
              id="user-2-select-cv"
              onInput={(e) => setTo(e.currentTarget.value)}
              class={select}
            >
              <OptionGroup allUsers={users} curr={to} other={from} />
            </select>
          </div>
          <button title="submit" class={connectionSubmitButton}>
            {loading ? <span>loading..</span> : "submit"}
          </button>
        </Form>
      </div>
    </div>
  );
}

function ChartViewer({ data, close, users }) {
  const active = data && data.length;
  useEffect(() => {
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [active]);

  return (
    <div class={[chartViewer, active ? null : chartViewerInactive]}>
      <div
        class={css({
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "1rem",
        })}
      >
        <button
          title="close"
          onClick={close}
          class={actionButton}
          style={{ fontSize: "2rem" }}
        >
          ✖
        </button>
      </div>
      {active && (
        <section>
          <h3>Connections</h3>
          {data.map((x: ConnData[]) => (
            <Viewer data={x} users={users} />
          ))}
        </section>
      )}
    </div>
  );
}

function Overview({ data }: { data: ConnData[] }) {
  return (
    <div class={css({ fontSize: "1.2rem" })}>
      {data.map((x, i) => (
        <>
          <b>{x.name}</b>
          {i !== data.length - 1 && (
            <span class={css({ marginLeft: "5px", marginRight: "5px" })}>
              {">"}
            </span>
          )}
        </>
      ))}
    </div>
  );
}
function Viewer({ data, users }: { data: ConnData[]; users: User[] }) {
  const [index, setIndex] = useState(0);
  const mappedData = data.map((x) => ({
    relation: x.relation,
    name: findUser(x.id, users).name,
    id: x.id,
  }));
  const curr = mappedData[index];
  const nextRelation = mappedData[index + 1] || ({} as any);
  return (
    <div class={viewerInstanceBox}>
      <Overview data={mappedData} />

      {curr && (
        <div class={center}>
          <div class={css({ textAlign: "center" })}>
            <div>
              <NameLogo text={curr.name} size="4rem" />
            </div>
            <div>{curr.name}</div>
            <div>
              {nextRelation.relation && index < mappedData.length && (
                <button
                  title="next user"
                  class={actionButton}
                  onClick={() => setIndex(index + 1)}
                >
                  is the {nextRelation.relation} of...
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
