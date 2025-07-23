import React from 'react';
import { useNavigate } from 'react-router-dom';

const Events = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                maxWidth: 600,
                margin: '4rem auto',
                background: 'rgba(24,24,24,0.97)',
                borderRadius: 24,
                boxShadow: '0 8px 32px #000b',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                fontFamily: 'Montserrat, Arial, sans-serif',
                color: '#fff',
                position: 'relative'
            }}
        >
            <h1
                style={{
                    color: 'var(--rust-orange)',
                    fontWeight: 900,
                    fontSize: '2.2rem',
                    marginBottom: '1.5rem',
                    letterSpacing: '2px',
                    textShadow: '0 2px 18px #000a'
                }}
            >
                Estadísticas del Evento
            </h1>
            <div
                style={{
                    background: 'linear-gradient(90deg, #23201a 70%, #e25822 100%)',
                    borderRadius: 14,
                    boxShadow: '0 2px 12px #e2582288',
                    padding: '1.2rem 1rem',
                    marginBottom: '1.5rem',
                    fontSize: '1.18rem',
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '1px',
                    textShadow: '0 1px 8px #000a',
                    border: '1.5px solid #e25822cc'
                }}
            >
                Las estadísticas estarán disponibles una vez que el evento haya comenzado.<br />
                Por favor, vuelve más tarde para consultar los resultados, rankings y datos en tiempo real.
            </div>
            <span
                style={{
                    color: '#b3cfff',
                    fontSize: '1.05rem',
                    fontWeight: 500,
                    display: 'block',
                    marginTop: '1.2rem',
                    opacity: 0.85
                }}
            >
                ¡Gracias por tu interés y participación en Rustaco Events!
            </span>
            <button
                onClick={() => navigate('/')}
                style={{
                    marginTop: '2.2rem',
                    background: 'linear-gradient(90deg, #e25822 60%, #23201a 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    padding: '0.8rem 2.2rem',
                    border: 'none',
                    borderRadius: 14,
                    boxShadow: '0 2px 12px #0007',
                    cursor: 'pointer',
                    transition: 'background 0.2s, transform 0.2s',
                    letterSpacing: '1px'
                }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
                Volver al inicio
            </button>
        </div>
    );
};

export default Events;