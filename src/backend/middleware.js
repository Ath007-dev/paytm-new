import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export function authMiddleware(req,res,next){
    const header=req.headers.authorization
    if(!header.startsWith("Bearer") || !header){
        res.status(403).json({})
    }
    const token=header.split(" ")[1]
    const validate=jwt.verify(token,JWT_SECRET)
    if (!validate.userId){
        res.status(403).json({})
    }
    req.userId=validate.userId
    next()
}
