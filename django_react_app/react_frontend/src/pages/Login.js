import { useContext } from "react";
import UserAuthContext from "../contexts/UserAuthContext";

function Login() {
    const {login, message} = useContext(UserAuthContext);

    return (
        <div>
            <center>
                <p>{message}</p>
                <form onSubmit={login}>
                    <input type="text" name="username" placeholder="Enter Username"/>
                    <input type="password" name="password" placeholder="Enter Password"/>
                    <input type="submit"/>
                </form>
            </center>
        </div>
    )
}

export default Login;