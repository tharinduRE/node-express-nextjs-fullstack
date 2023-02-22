
export interface IUser {
  id: string;
  email: string,
  name : string,
  provider: string
  role: 'ADMIN' | 'USER'
}
export interface User extends IUser {
  _id : string;
}
  