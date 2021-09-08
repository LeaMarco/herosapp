import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import { Route } from "react-router-dom";
import Login from "./components/login";
import { Nav } from "./components/Nav";
import { Detail } from "./components/detail";
import { Team } from "./components/team";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/team" component={Team} />


    </div>
  );
}

export default App;
