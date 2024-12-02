import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar">
        <h1>Gestión de Presentaciones</h1>
        <div>
            <Link to="/">Inicio</Link>
            <Link to="/crear">Crear Presentación</Link>
        </div>
    </nav>
);

export default Navbar;
