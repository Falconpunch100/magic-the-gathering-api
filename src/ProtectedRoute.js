import { Route, Redirect } from "react-router-dom"
import { WELCOME } from "./constants/routes.js"

function ProtectedRoute({ children, exact, path, ...rest}) {
    return (
        <Route exact={exact} path={rest.location.pathname} render={() => {
            const userID = localStorage.getItem("userID")
            if (userID !== null) {
                return children;
            }
            else {
                return <Redirect to={WELCOME}></Redirect>
            }
        }}>
        </Route>
    )
}

export default ProtectedRoute;