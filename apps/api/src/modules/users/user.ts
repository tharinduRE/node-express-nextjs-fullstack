export interface User {
    // mongo object id
    _id?: string;
    id: string;
    email: string,
    name : string,
    provider: string
    role: 'ADMIN' | 'USER'
  }
  