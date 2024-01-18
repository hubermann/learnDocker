import express from 'express';
import mongoose from 'mongoose';


// BD Schema
const catSchema = new mongoose.Schema({
    name: String,
    color: String
});
const Cat = mongoose.model('Cat', catSchema);


// BD conecction
mongoose.connect('mongodb://gabriel:password@mongocontainer:27017/miapp?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('strictQuery', false);


//Server actions
const app = express();

//Show cats
app.get('/', async (_req, res) => {
    try {
        console.log('Mostrando gatos');
        const animales = await Cat.find();
        return res.send(animales);
    } catch (error) {
        console.error('Error al listar!:', error);
        return res.status(500).send('Error interno del servidor');
    }
});

// Create a new cat
app.get('/create', async (_req, res) => {
    try {
        console.log('Creando gato');
        //gatos random
        const nombres = ["Fido", "Mauricio","Kurli", "Tincho", "Jengibre"];
        const randomName = nombres[Math.floor(Math.random() * nombres.length)];

        const colores = ["gris", "blanco","Marron", "Naranja", "Negro"];
        const randomColor = colores[Math.floor(Math.random() * colores.length)];

        const kitty = new Cat({ name: randomName, color: randomColor });
        await kitty.save();

        console.log('meow');
        return res.send('Okay. Gato ' + randomName + ' creado');
    } catch (error) {
        console.error('Error al crear:', error);
        return res.status(500).send('Error interno del servidor');
    }
});

app.listen(3000, () => console.log('Listen. PORT 3000'));