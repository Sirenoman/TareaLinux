import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PresentacionesList = () => {
    const [presentaciones, setPresentaciones] = useState([]);

    useEffect(() => {
        fetchPresentaciones();
    }, []);

    const fetchPresentaciones = () => {
        axios.get('http://localhost:5000/api/presentaciones')
            .then(response => setPresentaciones(response.data))
            .catch(error => console.error(error));
    };

    const deletePresentacion = (id) => {
        axios.delete(`http://localhost:5000/api/presentaciones/${id}`)
            .then(() => fetchPresentaciones())
            .catch(error => console.error(error));
    };

    return (
        <div className="list-container">
            <h2>Lista de Presentaciones</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Presentante</th>
                        <th>Servicio</th>
                        <th>Departamento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {presentaciones.map(p => (
                        <tr key={p._id}>
                            <td>{p.NUMERO_PRESENTACION}</td>
                            <td>{p.PRESENTANTE}</td>
                            <td>{p.SERVICIO}</td>
                            <td>{p.DEPARTAMENTO}</td>
                            <td>
                                <Link to={`/editar/${p._id}`}>Editar</Link>
                                <button onClick={() => deletePresentacion(p._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PresentacionesList;
