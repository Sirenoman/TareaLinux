const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
const presentacionRoutes = require('./routes/presentacionRoutes');
app.use('/api/presentaciones', presentacionRoutes);
app.use('/api/', (req, res) => {res.send("Hello world")});
// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Inicio del servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
