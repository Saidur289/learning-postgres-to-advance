import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import config from '../config/config';


const auth = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        
          const token = req.headers.authorization ;
        if(!token){
            return res.status(500).json({message: "You are not allowed"})
        }
        console.log({authToken: token});
        const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload
        console.log(decoded);
        req.user = decoded 
        if(roles.length && !roles.includes(decoded.role)){
            res.status(500).json({message: "Unauthorized"})
        }
        next()
      } catch (error: any) {
        res.status(500).json({message: error.message})
      }
    }
}
export default auth