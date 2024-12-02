import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PresentacionForm from './components/PresentacionForm';
import PresentacionesList from './components/PresentacionesList';

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<PresentacionesList />} />
            <Route path="/crear" element={<PresentacionForm />} />
            <Route path="/editar/:id" element={<PresentacionForm />} />
        </Routes>
    </Router>
);

export default App;
