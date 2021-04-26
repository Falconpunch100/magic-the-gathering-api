import "./Login.css"
import { Link, useHistory } from "react-router-dom"
import { LOGIN, SIGNUP, HOMEPAGE } from "../constants/routes.js"
import { useState, useEffect} from "react"
import { ValidateEmail } from "../utils"
import backEndAPI from "../api/back-end.js"
import Navbar from "../Navbar.js"

function Login({ isSignUpPage }) {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [error, setError] = useState("")
    let emailSuccess = ValidateEmail(email)
    let history = useHistory()
    useEffect(() => {
        setError("")
    }, [email, password])

    async function handleSignup(e) {
        try {
            e.preventDefault()
            const doesEmailExist = await backEndAPI.get("/users", {
                params: {
                    email: email
                }
            })
            if (doesEmailExist.data.length <= 0) {
                await backEndAPI.post("/users", {
                    email, password
                });
            }
            else {
                setError("That email already exists. Please try another one.")
            }
        } catch (error) {
            console.error(error)
            setError(error.message)
        }
    }
    async function handleLogin(e) {
        e.preventDefault()
        const response = await backEndAPI.get(`/users?email=${email}&password=${password}`)
        if (response.data.length <= 0) {
            setError("Username or Password is incorrect. Please try again.")
        }
        else {
            console.log("Login successful.")
            let userID = response.data[0].id
            localStorage.setItem("userID", userID)
            history.push(HOMEPAGE)
        }
    }
    return (
        <>
        <Navbar></Navbar>
        <div className="container">
            <div className="login-signup-page"></div>
            <section className="inputs">
                <form onSubmit={isSignUpPage ? handleSignup : handleLogin}>
                    {isSignUpPage ? <h3>Sign Up</h3> : <h3>Please Log In</h3>}
                    {error ? <p id="error">{error}</p>: null}
                    <label htmlFor="username">
                        <input value={email} id="username" placeholder="Enter Email Address" required type="text" onChange={(e) => { setEmail(e.target.value) }} />
                    </label>
                    <label htmlFor="password">
                        <input value={password} minLength="4" maxLength="12" required placeholder="Enter Password" type="password" name="" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </label>
                    <button disabled={emailSuccess ? false : true} type="submit" id="login-signup" className={emailSuccess ? "" : "disabled"}>Login</button>
                </form>

                {isSignUpPage ? <p>Already have an account? <Link to={LOGIN}>Log in</Link></p>:
                <p>Don't have an account? Sign up <Link to={SIGNUP}>here</Link>.</p>}
            </section>
        </div>
        </>
    )
}

export default Login;