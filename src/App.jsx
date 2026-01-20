import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import Equipos from "./pages/equipos.jsx";
import Reglas from "./pages/Reglas.jsx";
import Applys from "./pages/Applys.jsx";
import Admin from "./pages/Admin.jsx";
import Events from "./pages/Events.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/equipos" component={Equipos} />
        <Route path="/reglas" component={Reglas} />
        <Route path="/applys" component={Applys} />
        <Route path="/admin" component={Admin} />
        <Route path="/events" component={Events} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}