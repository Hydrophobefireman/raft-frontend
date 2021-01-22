import { FetchUsersContext, UsersContext } from "@/ctx";
import { useCallback, useState } from "@hydrophobefireman/ui-lib";

import { BoxContainer } from "../BoxContainer";
import { PeopleList } from "./PeopleList";
import { User } from "@/types";
import { get } from "@/util/http/requests";
import { useMount } from "@/customHooks";
import { userRoute } from "@/util/http/routes";

export function People() {
  const [allUsers, setUsers] = useState(null);
  const [error, setError] = useState(false);
  const fetchFunction = useCallback(async () => {
    setError(false);
    try {
      setUsers(await get<User[]>(userRoute.all));
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }, []);

  useMount(fetchFunction);

  if (error)
    return (
      <BoxContainer>
        <div>Could not fetch users</div>
      </BoxContainer>
    );
  if (allUsers == null)
    return (
      <BoxContainer>
        <div>loading...</div>
      </BoxContainer>
    );
  return (
    <UsersContext.Provider value={allUsers}>
      <FetchUsersContext.Provider value={fetchFunction}>
        <PeopleList />
      </FetchUsersContext.Provider>
    </UsersContext.Provider>
  );
}
