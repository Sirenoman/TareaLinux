const express = require('express');
const router = express.Router();
const Presentacion = require('../models/presentacion');

// Create
router.post('/', async (req, res) => {
    try {
        const nuevaPresentacion = new Presentacion(req.body);
        const resultado = await nuevaPresentacion.save();
        res.status(201).json(resultado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read (all)
router.get('/', async (req, res) => {
    try {
        const presentaciones = await Presentacion.find();
        res.json(presentaciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read (by ID)
router.get('/:id', async (req, res) => {
    try {
        const presentacion = await Presentacion.findById(req.params.id);
        if (!presentacion) return res.status(404).json({ error: 'No encontrado' });
        res.json(presentacion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const presentacionActualizada = await Presentacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!presentacionActualizada) return res.status(404).json({ error: 'No encontrado' });
        res.json(presentacionActualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Presentacion.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'No encontrado' });
        res.json({ message: 'Eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
