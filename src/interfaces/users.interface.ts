export interface User {
  _id: string;
  email: string;
  password?: string;
  homes?: Array<any>;
  token?: string;
}
