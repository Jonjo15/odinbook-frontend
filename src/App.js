import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Users from "./pages/Users"
import UserProfile from "./pages/UserProfile"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar"
import {AuthProvider} from "./context/authContext"
import NotificationsPage from "./pages/NotificationsPage"
import FriendRequests from "./pages/FriendRequests"


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Auth}/>
            <PrivateRoute path="/home" component={Home}/>
            <PrivateRoute path="/profile" component={Profile}/>
            <PrivateRoute exact path="/users" component={Users}/>
            <PrivateRoute path="/users/:userId" component={UserProfile}/>
            <PrivateRoute exact path="/notifications" component={NotificationsPage}/>
            <PrivateRoute exact path="/requests" component={FriendRequests}/>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
