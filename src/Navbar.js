import * as ROUTES from "./constants/routes.js"
import { Link, useHistory } from "react-router-dom"
import Logo from "./Magicthegatheringlogo.png"
import "./Navbar.css"

function Navbar() {
    return (
        <nav id="navbar">
            <ul>
                <li><Link to={ROUTES.HOMEPAGE}><img id="nav-img" src={Logo} alt="Magic The Gathering logo"></img></Link></li>
                <li><Link to={ROUTES.LOGIN}>Log In</Link></li>
                <li><Link to={ROUTES.SIGNUP}>Sign Up</Link></li>
                <li><Link to={ROUTES.RANDOMIZER}>Create New Deck</Link></li>
                <li><Link to={ROUTES.EDIT}>Edit Deck</Link></li>
                <li><Link to={ROUTES.HOMEPAGE}>Log Out</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar