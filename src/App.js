import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
          <Route exact path="/" component={Auth}/>
          <PrivateRoute path="/home" component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
