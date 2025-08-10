import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/styles.css';
import Home from './pages/Home';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Reglas from './pages/Reglas';
import Admin from './pages/Admin';
import Applys from './pages/Applys'; // importa el formulario de inscripción
import Equipos from './pages/equipos';

function App() {
    return (
        <Router>
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #181818 0%, #23201a 60%, #1a2320 100%)',
                backgroundAttachment: 'fixed'
            }}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/events" component={Events} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/reglas" component={Reglas} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/applys" component={Applys} />
                    <Route path="/equipos" component={Equipos} />
                </Switch>
                {/* Elimina este footer global, ya hay uno en Home.jsx y otras páginas */}
                {/* 
                <footer style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '1.2rem 0 0.7rem 0',
                    color: '#b3cfff',
                    fontFamily: 'Montserrat, Arial, sans-serif',
                    fontWeight: 500,
                    fontSize: '1.05rem',
                    background: 'rgba(24,24,24,0.93)',
                    borderTop: '1.5px solid #23201a',
                    letterSpacing: '1px',
                    marginTop: 40
                }}>
                    Rustaco Eventos &copy; {new Date().getFullYear()} — Todos los derechos reservados. Inspirado en la pasión por Rust y la comunidad LATAM.
                </footer>
                */}
            </div>
        </Router>
    );
}

export default App;