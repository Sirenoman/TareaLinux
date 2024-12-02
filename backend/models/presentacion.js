const mongoose = require('mongoose');

const PresentacionSchema = new mongoose.Schema({
    NUMERO_PRESENTACION: { type: Number, required: true, unique: true },
    PRESENTANTE: { type: String, required: true },
    SERVICIO: { type: String, required: true },
    DEPARTAMENTO: { type: String, required: true },
});

module.exports = mongoose.model('Presentacion', PresentacionSchema);
