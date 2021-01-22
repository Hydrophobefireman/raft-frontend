import { host } from "../constants";

const absoluteURL = (str: string): string => {
  return new URL(str, host).href;
};

export const userRoute = {
  create: (name: string) => absoluteURL(`/users/create/${name}`),
  addConnection: absoluteURL("/users/connections/add"),
  usersById: absoluteURL("/users/by-id"),
  all: absoluteURL("/users/all"),
};

export const graphRoute = {
  affinity: (from: string, to: string) =>
    absoluteURL(`/graph/affinity/${from}/${to}`),
};
