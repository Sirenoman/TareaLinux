const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server.js'); // Importa tu aplicación Express

let mongoServer;

beforeAll(async () => {
  // Inicia un MongoDB en memoria
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Conecta tu aplicación al MongoDB en memoria
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Cierra las conexiones y apaga el servidor de MongoDB en memoria
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Pruebas de API', () => {
  it('Debe responder con un estado 200 en el endpoint base', async () => {
    const res = await request(app).get('/api/presentaciones');
    expect(res.statusCode).toBe(200);
  });
 // VALIDANDO INGRESO CON LOS SIGUIENTES DATOS
  it('Debe permitir la creación de una nueva presentación', async () => {
    const nuevaPresentacion = {
        NUMERO_PRESENTACION : '20231220876',
        PRESENTANTE : 'Jonathan Galdamez',
        SERVICIO : 'Inscripcion',
        DEPARTAMENTO : 'San salvador',
    };

    const res = await request(app)
      .post('/api/presentaciones')
      .send(nuevaPresentacion);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id'); // Verifica que se cree un ID único
    expect(res.body.titulo).toBe(nuevaPresentacion.titulo);
  });
});

