import { useState } from "react";
import axios from 'axios';
import Navbar from "./Navbar";
import "./css/Registration.css";

function Registration() {
    const [registrationData, setRegistrationData] = useState([]);
    const [err, setErr] = useState('');

    function handleChange(e) {
        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    }

    function handleRegister(e) {
        e.preventDefault();
        console.log(registrationData);
        matchRegisteredUsers();

    }

    async function sendDataToDb() {
         if (!registrationData.loginType || !registrationData.name || !registrationData.email || !registrationData.password) {
            setErr("Enter all the required fields");
        }else{

            const url = registrationData.loginType === 'user' ? "http://localhost:1025/users" : "http://localhost:1025/sellers";
            const sendData = await axios.post(url, registrationData);
            console.table(sendData.data);
        }
    }

    async function matchRegisteredUsers() {
        const url = registrationData.loginType === "user" ? "http://localhost:1025/users" : "http://localhost:1025/sellers";
        const res = await axios.get(url);
        const gotData = res.data;
        console.log(gotData);
        let finalData = gotData.find((e) => registrationData.email === e.email);
        console.log(finalData);
        if (!finalData) {
            sendDataToDb();
        }
        else {
            setErr(`There is a user already with the same email: ${registrationData.email}. Try to use another email to Register`);
        }
    }

    return (
        <>
            <Navbar />
            <div className="text-center">
                <h1>Registration Page</h1>
                <div id="registration">
                    <p className="display-5 text-primary text-center">Registration</p>
                    <form onSubmit={handleRegister}>
                        <p className="text-warning">Select the User type: </p>
                        <h6 className="text-danger">{err}</h6>
                        <input id="user" className="p-1" type="radio" name="loginType" value="user" onChange={handleChange} /><label className="p-1" htmlFor="user">User</label>
                        <input id="seller" className="p-1" type="radio" name="loginType" value="seller" onChange={handleChange} /><label className="p-1" htmlFor="seller">Seller</label><br /><br />
                        <label htmlFor="name">Enter name : </label>
                        <input type="text" name="name" onChange={handleChange} placeholder="Enter Name: " id="name" /><br /><br />
                        <label htmlFor="email">Enter Email : </label>
                        <input type="email" name="email" onChange={handleChange} placeholder="Enter Email: " id="email" /><br /><br />
                        <label htmlFor="password">Enter name : </label>
                        <input type="password" name="password" onChange={handleChange} placeholder="Enter Password: " id="password" /><br /><br />
                        <input type="submit" name="Register" />
                    </form>
                </div>

            </div>

        </>
    )
}
export default Registration;