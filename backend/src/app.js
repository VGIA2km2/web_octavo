const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productos.routes');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Productos funcionando. Usa /api/producto para obtener datos.');
});

app.use('/api', productosRoutes);

module.exports = app;
