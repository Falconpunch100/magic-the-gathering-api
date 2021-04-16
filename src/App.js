import * as ROUTES from "./constants/routes.js"
import { Route, Switch } from "react-router-dom"
import Login from "./pages/Login.js"
import CardShop from "./pages/CardShop"
import Dashboard from "./pages/Dashboard.js"
import EditPage from "./pages/EditPage.js"
import ProtectedRoute from "./ProtectedRoute.js"
import Navbar from "./Navbar.js"

function App() {
  return (
    <main className="App">
      <Navbar></Navbar>
      <Switch>
        <ProtectedRoute exact path={ROUTES.HOMEPAGE}>
          <Dashboard></Dashboard>
        </ProtectedRoute>
        <Route path={ROUTES.LOGIN}>
          <Login isSignUpPage={false}></Login>
        </Route>
        <Route path={ROUTES.SIGNUP}>
          <Login isSignUpPage={true}></Login>
        </Route>
        <ProtectedRoute path={ROUTES.RANDOMIZER}>
          <CardShop></CardShop>
        </ProtectedRoute>
        <ProtectedRoute path={ROUTES.EDIT}>
          <EditPage>
          </EditPage>
        </ProtectedRoute>
        <Route>404 Not Found.</Route>
      </Switch>
    </main>
  );
}



export default App;
