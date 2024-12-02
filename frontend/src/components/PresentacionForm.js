import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PresentacionForm = () => {
    const [form, setForm] = useState({
        NUMERO_PRESENTACION: '',
        PRESENTANTE: '',
        SERVICIO: '',
        DEPARTAMENTO: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/presentaciones/${id}`)
                .then(response => setForm(response.data))
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://localhost:5000/api/presentaciones/${id}`, form)
                .then(() => navigate('/'))
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:5000/api/presentaciones', form)
                .then(() => navigate('/'))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="form-container">
            <h2>{id ? 'Editar Presentación' : 'Crear Presentación'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="NUMERO_PRESENTACION"
                    placeholder="Número de Presentación"
                    value={form.NUMERO_PRESENTACION}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="PRESENTANTE"
                    placeholder="Presentante"
                    value={form.PRESENTANTE}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="SERVICIO"
                    placeholder="Servicio"
                    value={form.SERVICIO}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="DEPARTAMENTO"
                    placeholder="Departamento"
                    value={form.DEPARTAMENTO}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default PresentacionForm;
