
import {useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
export function Signup() {
    const [firstName,setfirstname]=useState("")
    const [lastName,setlastname]=useState("")
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")

        const navigate=useNavigate()
    return (
        <div className="bg-gray-400 h-screen flex justify-center items-center">
            <div className="rounded-lg bg-white w-80 p-2 text-center h-max px-4">
                <div className="text-4xl font-bold text-black pt-4">Sign Up</div>
                <div className="text-gray-500 pt-3 "> Enter your information to create an account</div>
                <div className="text-black p-3 font-medium text-left">First Name</div>
                <input type="text" onChange={(e)=>{
                    setfirstname(e.target.value)
                }} placeholder="John" className=" pl-3 h-9 w-full border-2 border-slate-200 rounded-lg"/>
                <div className="text-black font-medium p-3 text-left">Last Name</div>
                <input type="text" onChange={(e)=>{
                    setlastname(e.target.value)
                }} placeholder="Doe" className=" pl-3 h-9 w-full border-2 border-slate-200 rounded-lg"/>
                <div className="text-black font-medium p-3 text-left">Username</div>
                <input type="text" onChange={(e)=>{
                    setusername(e.target.value)
                }} placeholder="johndoe@example.com" className=" pl-3 h-9 w-full border-2 border-slate-200 rounded-lg"/>
                <div className="text-black font-medium p-3 text-left">Password</div>
                <input type="text" onChange={(e)=>{
                    setpassword(e.target.value)
                }} placeholder="" className="pl-3  h-9 w-full border-2 border-slate-200 rounded-lg"/>
                <button className="h-10 mt-5 w-50 rounded-lg text-white bg-black"
                        onClick={async()=>{
                            const response=await axios.post("http://localhost:3000/api/v1/user/signup",{firstName,lastName,username,password})
                            if(response) {
                                navigate("/signin")
                            }
                        }}
                > Sign Up </button>
                <div className="pt-3 flex justify-center">
                    <div className="text-black">Already have an account?</div>
                    <Link to="/signin" className="underline text-black cursor-pointer ml-1">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
