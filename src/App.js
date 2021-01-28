import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Users from "./pages/Users"
import User from "./pages/User"
import SinglePost from "./pages/SinglePost"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar"
import {AuthProvider} from "./context/authContext"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Auth}/>
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/profile" component={Profile}/>
            <PrivateRoute path="/users" component={Users}/>
            <PrivateRoute path="/users/:userId" component={User}/>
            <PrivateRoute path="posts/:postId" component={SinglePost}/>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
