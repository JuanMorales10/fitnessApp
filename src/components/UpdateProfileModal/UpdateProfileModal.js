import React, { useState, useEffect } from 'react';
import './UpdateProfileModal.css';

const UpdateProfileModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({
        nombre: '',
        edad: '',
        peso: '',
        altura: '',
        genero: '',
        frecuencia: '',
        objetivo: ''
    });

    useEffect(() => {
        const savedData = localStorage.getItem('userProfile');
        if (savedData) {
            setForm(JSON.parse(savedData));
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userProfile', JSON.stringify(form));
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Modificar Perfil</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-content">
                    <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
                    <input type="number" name="edad" placeholder="Edad" value={form.edad} onChange={handleChange} />
                    <input type="number" name="peso" placeholder="Peso (kg)" value={form.peso} onChange={handleChange} />
                    <input type="number" name="altura" placeholder="Altura (cm)" value={form.altura} onChange={handleChange} />
                    <select name="genero" value={form.genero} onChange={handleChange}>
                        <option value="">Seleccione Género</option>
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                    </select>
                    <select name="frecuencia" value={form.frecuencia} onChange={handleChange}>
                        <option value="">Frecuencia de entrenamiento por semana</option>
                        <option value="1-2">1-2 veces</option>
                        <option value="3-4">3-4 veces</option>
                        <option value="5-6">5-6 veces</option>
                        <option value="7">7 veces</option>
                    </select>
                    <select name="objetivo" value={form.objetivo} onChange={handleChange}>
                        <option value="">Seleccione Objetivo</option>
                        <option value="definicion">Definición</option>
                        <option value="recomposicion">Recomposición Corporal</option>
                        <option value="volumen">Volumen</option>
                    </select>
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;
