import Navbar from "./Navbar";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../redux/slice/LoginSlice";

function Login() {
    const [loginData, setLoginData] = useState([]);
    // const [err, setErr] = useState('');
    const { loading, errMessage, payload } = useSelector((state=>state.login));

    const dispatch = useDispatch();
    const navigate = useNavigate();


    function handleChange(e){
        setLoginData({...loginData,[e.target.name]:e.target.value});
    }

    function handleLogin(e){
        e.preventDefault();
        console.log(loginData);
        dispatch(loginThunk({...loginData,navigate}))
        .unwrap()
        .then(()=>{
            console.log("Logged in");
        })
    .catch((error)=>{
        console.log(error);
    })
    }

    return (
        <>
            <Navbar />
            <div className="text-center" id="login">
                {payload && payload.email?<h1 className="display-1">{payload.email}</h1>:''}
                <form onSubmit={handleLogin} autoComplete="off">
                    <p className="text-dark display-6">Login</p><br />
                    {(errMessage) && <h1 className="display-6 text-danger">{errMessage}</h1>}
                    {loading && <p className="text-primary">Logging in...</p>}
                    <input type="radio" name="loginType" value="user" id="userRadio" onChange={handleChange} />
                    <label className="p-2" htmlFor="userRadio">User</label>
                    <input type="radio" name="loginType" value="seller" id="adminRadio" onChange={handleChange} />
                    <label className="p-2" htmlFor="adminRadio">Seller</label><br /><br />

                    <label htmlFor="email">Enter Email : </label>
                    <input type="email" autoComplete="off" placeholder="Enter your Email :" name="email" id="email" onChange={handleChange} /><br /><br />

                    <label htmlFor="password">Enter Password : </label>
                    <input type="password" autoComplete="off" placeholder="Enter your password:" name="password" id="password" onChange={handleChange} /><br /><br />

                    <input type="submit" value="Login" className="m-5 bg-primary" />
                </form>
            </div>
        </>
    );
}
export default Login;