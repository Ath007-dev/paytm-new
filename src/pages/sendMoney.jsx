import {useSearchParams,useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export function SendMoney(){
    const [searchParams]=useSearchParams()
    const [amount,setAmount]=useState(0)
    const id=searchParams.get("id")
    const name=searchParams.get("name")
    const navigate=useNavigate()
    async function eventHandler(){
        const response=await axios.post("http://localhost:3000/api/v1/account/transfer",
            {to:id,amount:Number(amount)},
            {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
        )
        if(response){
            alert("Sent money successfully!")
            navigate("/dashboard")
        }
    }
    return(
        <div className=" bg-gray-400 h-screen flex justify-center items-center ">
            <div className="rounded-lg bg-white w-80 p-2 text-center h-max px-4">
            <div className="text-black text-3xl font-bold">Send Money</div>
            <div className="mt-5 flex">
                <div className="mt-3 size-10 pt-2 rounded-full bg-green-400">{name[0]}</div>
                <div className="ml-3 pt-5 text-black font-medium">{name}</div>
            </div>
            <div className="mt-3 text-black text-sm font-medium text-left">Amount(in Rs)</div>
            <input className="mt-2 w-full border-2 border-black rounded-md" type="Number" placeholder="Enter amount" onChange={(e)=>setAmount(e.target.value)}></input>
            <button className=" hover:cursor-pointer hover:scale-105 mt-4 mb-4 bg-green-400 text-white w-full rounded-md"
                    onClick={eventHandler}
            >Send money to {name}
            </button>
            </div>
        </div>
    )
}