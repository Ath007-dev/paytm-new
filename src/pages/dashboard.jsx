import {useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Dashboard() {
    const [balance,setBalance]=useState(0)
    const [search,setSearch]=useState("")
    const [users,setUsers]=useState([])
    useEffect(() => {
        async function getData(){
            const response=await axios.get("http://localhost:3000/api/v1/user/")
            if(response){
                setUsers(response.data.users)
            }
        }
        getData()
    }, []);
    useEffect(()=>{
        async function fetchBalance(){
            const token=localStorage.getItem("token")
            const response=await axios.get("http://localhost:3000/api/v1/account/balance",{headers:{Authorization:`Bearer ${token}`}})
            if(response){
                setBalance(response.data.balance)
            }
        }

        fetchBalance()
    },[])

    const filteredUser=users.filter((user)=>user.firstName.toLowerCase().includes(search.toLowerCase()))

    const navigate=useNavigate()
    return (
        <div>
            <div className="flex justify-between">
                <div className="ml-2 p-4 text-black font-bold text-3xl ">Payments App</div>
                <div className="flex p-4">
                    <div className=" p-3 text-black font-light">Hello,User</div>
                    <button className="rounded-full size-10 bg-gray-400 text-black mr-2">U</button>
                </div>
            </div>
            <div className="outline-1 outline-slate-200"></div>
            <div className="flex p-4">
                <div className="ml-2 font-bold text-black">Your balance</div>
                <div className="pl-3 text-black font-bold">{balance}</div>
            </div>
            <div className="ml-2 p-3 text-black font-bold">Users</div>
            <input type="text" placeholder="Search users..." className="p-3 m-3 w-full rounded-lg border-1 border-slate-200" onChange={e=>setSearch(e.target.value)}/>
            {filteredUser.map(user =>(
                <div className="flex justify-between">
                    <div className="ml-2 flex">
                        <button className="ml-2 p-3 m-3 rounded-full size-10 bg-gray-400 text-black">{(user.firstName+" "+user.lastName).split(" ").map(n=>n[0]).join("")}</button>
                        <div className="p-3 m-3 pl-2 text-black font-bold">{user.firstName +" "+user.lastName}</div>
                    </div>
                    <button className="rounded-lg w-30 text-white bg-black mt-2 mr-2"
                            onClick={
                                ()=>navigate(`/sendMoney?id=${user._id}&name=${user.firstName}`)
                    }>
                        Send Money</button>
                </div>
            ))}
        </div>
    );
}


