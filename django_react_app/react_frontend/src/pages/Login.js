import { useContext } from "react";
import UserAuthContext from "../contexts/UserAuthContext";

function Login() {
    const {loginUser, errorMessage} = useContext(UserAuthContext);

    return (
        <div>
            <p>{errorMessage}</p>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username"/>
                <input type="password" name="password" placeholder="Enter Password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login;