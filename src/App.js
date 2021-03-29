import * as ROUTES from "./constants/routes.js"
import { Route, Switch } from "react-router-dom"
import Login from "./pages/Login.js"
import  CardShop  from "./pages/CardShop"
import Dashboard from "./pages/Dashboard.js"

function App() {
  return (
    <main className="App">
      <Switch>
      <Route exact path={ROUTES.HOMEPAGE}>
        <Dashboard></Dashboard>
      </Route>
      <Route path={ROUTES.LOGIN}>
        <Login isSignUpPage={false}></Login>
      </Route>
      <Route path={ROUTES.SIGNUP}>
        <Login isSignUpPage={true}></Login>
      </Route>
      <Route path={ROUTES.SETUP}>
      </Route>
      <Route path={ROUTES.SEARCH}>
      </Route>
      <Route path={ROUTES.RANDOMIZER}>
        <CardShop></CardShop>
      </Route>
      <Route path={ROUTES.PLAYGAME}>
      </Route>
      <Route>404 Not Found.</Route>
      </Switch>
    </main>
  );
}



export default App;
