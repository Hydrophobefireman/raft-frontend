import { User } from "@/types";

export function findUser(a: string, allUsers: User[]): User {
  return allUsers.find((x) => x._id === a);
}
