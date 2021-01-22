export interface User {
  name: string;
  _id: string;
  connections: Array<{ id: string; relation: string }>;
}
