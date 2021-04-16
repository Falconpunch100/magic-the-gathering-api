import { Route, Redirect } from "react-router-dom"
import { LOGIN } from "./constants/routes.js"

function ProtectedRoute({ children, exact, path }) {
    return (
        <Route exact={exact} path={path} render={() => {
            const userID = localStorage.getItem("userID")
            if (userID !== null) {
                return children;
            }
            else {
                return <Redirect to={LOGIN}></Redirect>
            }
        }}>
        </Route>
    )
}

export default ProtectedRoute;