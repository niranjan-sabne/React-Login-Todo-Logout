//Importing required packages, components and libraries 

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import LogOut from "./pages/LogOut";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Functional Component

function App() {
  return (
    <>
      {/* Routing Part for Pages */}
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/home" exact component={Home} />
          <Route path="/logout" exact component={LogOut} />
        </Switch>
      </Router>
    </>
  );
}

// Exporting Functional Component

export default App;
