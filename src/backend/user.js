import express from "express";
import jwt from "jsonwebtoken";
import {z} from "zod";
import { JWT_SECRET } from "./config.js";
import { authMiddleware } from "./middleware.js";
import {Account, User} from "./db.js";

const signupSchema=z.object({
    username:z.string().email(),
    password:z.string().min(3),
    firstName:z.string().min(3),
    lastName:z.string().min(3)
})


const router=express.Router()
router.post("/signup",async (req,res)=>{
    const body=req.body
    const validate=signupSchema.safeParse(body)
    if(!validate.success){
        return res.json({message:"invalid inputs! Password should be min 6 character long along with atleast one lowercase,uppercase and number/"})
    }
    const existingUser= await User.findOne({username:body.username})
    if(existingUser){
        return res.json({message:"email already taken"})
    }
    const dbUser=await User.create(body)
    await Account.create({
        userId:dbUser._id,
        balance:1+Math.random()*10000
    })
    const token=jwt.sign({userId: dbUser._id},JWT_SECRET)
    res.json({
        message: "User created successfully",
        token: token
    })

})

const signinSchema=z.object({
    username:z.string().email(),
    password:z.string().min(3)
})

router.post("/signin",async (req,res)=>{
    const body=req.body
    const validate=signinSchema.safeParse(body)
    if(!validate.success){
        res.json({message:"invalid inputs"})
    }
    const existingUser=await User.findOne({username:body.username})
    if(!existingUser){
        res.json({message:"you need to signup first"})
    }
    const token=jwt.sign({userId:existingUser._id},JWT_SECRET)
    res.status(200).json({
        token:token
    })
    if(!token){
        res.status(411).json({message:"Error while logging in"})
    }
})
const updateSchema= z.object({
    password:z.string().min(6).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
    firstName:z.string().min(3),
    lastName:z.string().min(3)
})
router.get("/",async (req,res)=>{
    const users=await User.find({})
    res.json({users})
})

router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter || ""
    const user= await User.find({
        $or :[{firstName:{$regex:filter}},{lastName:{$regex:filter}}]
    })
    const match=user.map(obj=>({
        username:obj.username,
        firstName:obj.firstName,
        lastName:obj.lastName,
        _id:obj._id
    }))
    res.json({
        user:match
    })
})
export {router};