// Add jwt payload to express request
declare namespace Express {
    export interface Request {
        auth: {
            token?:string
            payload?: JWTPayload
        }
    }
  }