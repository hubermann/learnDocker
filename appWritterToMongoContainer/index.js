import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Definir el esquema antes de crear el modelo
const animalSchema = new mongoose.Schema({
    tipo: String,
    estado: String
});

// Crear el modelo usando el esquema
const Animal = mongoose.model('Animal', animalSchema);

mongoose.connect('mongodb://gabriel:password@mongocontainer:27017/miapp?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('strictQuery', false);


// Manejar eventos de conexión y error
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});

app.get('/', async (_req, res) => {
    try {
        console.log('Listando..animales..');
        const animales = await Animal.find();
        return res.send(animales);
    } catch (error) {
        console.error('Error al listar animales:', error);
        return res.status(500).send('Error interno del servidor');
    }
});

app.get('/crear', async (_req, res) => {
    try {
        console.log('Mostrando....');
        await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' });
        return res.send('Okay. Animal creado');
    } catch (error) {
        console.error('Error al crear animal:', error);
        return res.status(500).send('Error interno del servidor');
    }
});

app.listen(3000, () => console.log('Escuchando en el puerto 3000'));
