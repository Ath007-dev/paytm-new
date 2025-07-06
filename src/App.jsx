import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Signin} from "./pages/signin.jsx";
import {Dashboard} from "./pages/dashboard.jsx";
import {SendMoney} from "./pages/sendMoney.jsx";
import {Signup} from "./pages/signup.jsx";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/sendMoney" element={<SendMoney/>}/>
            </Routes>
        </BrowserRouter>
    )
}