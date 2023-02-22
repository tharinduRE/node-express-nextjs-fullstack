// Add jwt payload to express request
declare namespace Express {
    export interface Request {
        auth: {
            token?:string
            payload?: JWTPayload
        }
    
        _pagination : {
            page:number,
            pageSize:number,
            sortBy: string,
            sortOrder: any,
        }

        _filterQuery : any
        
    }
  }