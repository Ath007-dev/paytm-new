import express from "express";
import { Account } from "./db.js";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware.js";

const router = express.Router();

router.get("/balance",authMiddleware,async (req,res)=>{
    const account=await Account.findOne({userId:req.userId})
    if(!account){
        res.json({
            message:'no account for the user'
        })
    }
    res.json({
        balance:account.balance

    })
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession();
    await session.startTransaction()
    const {to,amount}=req.body
    const sender=await Account.findOne({userId:req.userId}).session(session)
    if(!sender || sender.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }
    const receiver=await Account.findOne({userId:to}).session(session)
    if(!receiver){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Receiver not found"
        })
    }
    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)
    await session.commitTransaction()
    await session.endSession()
    res.json({message:"transfer successful!"})

})


export {router};