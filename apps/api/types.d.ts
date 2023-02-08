// Add jwt payload to express request
declare namespace Express {
    export interface Request {
        user: any;
    }
  }