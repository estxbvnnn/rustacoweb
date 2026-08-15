import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext.jsx";
import Loader from "./components/Loader.jsx";
import SiteBackground from "./components/SiteBackground.jsx";
import Navbar from "./components/Navbar.jsx";
import ComingSoonToast from "./components/ComingSoon.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import Events from "./pages/Events.jsx";
import Maps from "./pages/Maps.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <LanguageProvider>
      <Loader />
      <Router>
        <SiteBackground />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/events" component={Events} />
          <Route path="/maps" component={Maps} />
          <Route path="/profile" component={Profile} />
          <Route path="/contact" component={Contact} />
        </Switch>
        <ComingSoonToast />
      </Router>
    </LanguageProvider>
  );
}
