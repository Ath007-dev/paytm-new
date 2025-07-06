
import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

export function Signin() {
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const navigate= useNavigate()
    return (
        <div className="bg-gray-400 h-screen flex justify-center items-center">
            <div className="rounded-lg bg-white w-80 p-2 text-center h-max px-4">
                <div className="text-4xl font-bold text-black pt-4">Sign In</div>
                <div className="text-gray-500 pt-3 "> Enter your credentials to access your account</div>
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
                         const response= await axios.post("http://localhost:3000/api/v1/user/signin",{username,password})
                          if(response){
                              localStorage.setItem("token",response.data.token)
                              navigate("/dashboard")
                          }
                        }}

                >Sign In</button>
                <div className="pt-3 flex justify-center">
                    <div className="text-black">Dont have an account?</div>
                    <Link to="/signup" className="underline text-black cursor-pointer ">Sign up</Link>
                </div>
            </div>
        </div>
    );
}


