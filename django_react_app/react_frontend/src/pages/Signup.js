import { useState } from 'react';

function Signup() {
    const [messages, setMessages] = useState([null]);

    async function signup(e) {
        e.preventDefault();
        // const response = await fetch('http://127.0.0.1:8000/api/signup_user/', {
        const response = await fetch('http://127.0.0.1/api/signup_user/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value,
                "confirm_password": e.target.confirm_password.value,
                "zip_code": e.target.zip_code.value
            })
        });
        const data = await response.json();
        if (data !== true) {
            setMessages(data)
        } else {
            alert("Account has been created!\n\nYou can now login.")
            setMessages(["Account has been created! You can now login."])
        }
    }

    return (
        <div>
            <center>
                <div className="messages">
                    {messages.map((error, i) =>
                        <div key={i}>
                            <p>{error}</p>
                        </div>
                    )}
                </div>
                <form onSubmit={signup}>
                    <input type="text" name="username" placeholder="Enter Username" required/>
                    <input type="password" name="password" placeholder="Enter Password" required/>
                    <input type="password" name="confirm_password" placeholder="Confirm Password" required/>
                    <input type="text" name="zip_code" placeholder="Enter ZIP Code" maxLength={5} required/>
                    <input type="submit"/>
                </form>
            </center>
        </div>
    )
}

export default Signup;