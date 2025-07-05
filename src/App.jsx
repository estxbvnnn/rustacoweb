import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/styles.css';
import Home from './pages/Home';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Reglas from './pages/Reglas';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/events" component={Events} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/reglas" component={Reglas} />
            </Switch>
        </Router>
    );
}

export default App;