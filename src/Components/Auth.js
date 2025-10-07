import {auth, provider } from "../firebase_config.js";
import "../Styles\\Auth.css"
import {signInWithPopup, signINWithPopup} from "firebase/auth";
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export const Auth = (props) => {

    const {setIsAuth} = props;
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result)
        cookies.set("auth-token",result.user.refreshToken)
        setIsAuth(true);
        }


    return (
    <div className = "auth">
        <p>Sign In With Google to Continue</p>
        <button onClick = {signInWithGoogle}>Sign In with Google</button>
    </div>
    ); 
}