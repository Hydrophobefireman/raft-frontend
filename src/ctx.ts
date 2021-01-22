import { User } from "./types";
import { createContext } from "@hydrophobefireman/ui-lib";

export const UsersContext = createContext<User[]>(null);
export const FetchUsersContext = createContext<() => Promise<void>>(
  async () => {}
);
