import "./Login.css"
import { Link } from "react-router-dom"
import { LOGIN, SIGNUP, RECOVERY } from "../constants/routes.js"
import { useState } from "react"
import { ValidateEmail } from "../utils"
import backEndAPI from "../api/back-end.js"

function Login({ isSignUpPage }) {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let emailSuccess = ValidateEmail(email)
    async function handleSignup(e) {
        e.preventDefault()
        const response = await backEndAPI.post("/users", {
            email, password
        });
        console.log(response.data)
    }
    async function handleLogin(e) {
        e.preventDefault()
        const response = await backEndAPI.get(`/users?email=${email}&password=${password}`)
        console.log(response.data)
    }
    return (
        <div className="container">
            <div className="login-signup-page"></div>
            <section className="inputs">
                <form onSubmit={isSignUpPage ? handleSignup : handleLogin}>
                    {isSignUpPage ? <h3>Sign Up</h3> : <h3>Please Log In</h3>}
                    {/* {emailSuccess ? null: <p>Please enter a valid Email address.</p>} */}
                    <label htmlFor="">
                        <input value={email} placeholder="Enter Email Address" required type="text" onChange={(e) => { setEmail(e.target.value) }} />
                    </label>
                    <label htmlFor="">
                        <input value={password} minLength="4" maxLength="12" required placeholder="Enter Password" type="password" name="" id="" onChange={(e) => { setPassword(e.target.value) }} />
                        <p><Link to={RECOVERY}>Forgot your password?</Link></p>
                    </label>
                    <button disabled={emailSuccess ? false : true} type="submit" id="login-signup" className={emailSuccess ? "" : "disabled"}>Login</button>
                </form>

                {isSignUpPage ? <p>Already have an account? <Link to={LOGIN}>Log in</Link></p>:
                <p>Don't have an account? Sign up <Link to={SIGNUP}>here</Link>.</p>}
            </section>
        </div>
    )
}

export default Login;

