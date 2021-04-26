import * as ROUTES from "./constants/routes.js"
import { Link, useHistory } from "react-router-dom"
import Logo from "./Magicthegatheringlogo.png"
import "./Navbar.css"

function Navbar() {
    const history = useHistory()
    return (
        <nav id="navbar">
            <ul>
                {localStorage.getItem("userID") !== null ? <>
                    <li><Link to={ROUTES.HOMEPAGE}><img id="nav-img" src={Logo} alt="Magic The Gathering logo"></img></Link></li>
                    <li><Link to={ROUTES.RANDOMIZER}>Create New Deck</Link></li>
                    <li style={{ color: "white" }} onClick={() => {
                        localStorage.removeItem("userID")
                        history.push(ROUTES.LOGIN)
                    }}>Log Out</li>
                </> : <>
                    <li><Link to={ROUTES.HOMEPAGE}><img id="nav-img" src={Logo} alt="Magic The Gathering logo"></img></Link></li>
                    <li><Link to={ROUTES.LOGIN}>Log In</Link></li>
                    <li><Link to={ROUTES.SIGNUP}>Sign Up</Link></li>
                </>}
            </ul>
        </nav>
    )
}

export default Navbar