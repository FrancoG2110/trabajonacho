
const menu = require('./menu.json');
const express = require('express');
const app = express();
app.use(express.json());

const port = 3000; // Puerto en el que se ejecutará el servidor


    
    

// Endpoint para obtener el menú
app.get('/menu', (req, res) => {
    res.json({"menu": menu});
});

app.get('/menu.id', (req, res) => {
    const plato = menu.find(item => item.id == 6);
    if (plato) {
        res.json(plato);
    } else {
        res.status(404).json({ error: 'Elemento no encontrado' });
    }
});


app.get('/menu.combo', (req, res) => {
    const platoCombo = menu.filter(item => item.tipo == "combo");
    if (platoCombo.length > 0) {
        res.json(platoCombo);
    } else {
        res.status(404).json({ error: 'Elementos de combo no encontrados' });
    }
});

app.get('/menu.principal', (req, res) => {
    const platoPrincipal = menu.filter(item => item.tipo == "principal");
    if (platoPrincipal.length > 0) {
        res.json(platoPrincipal);
    } else {
        res.status(404).json({ error: 'Elementos de Principal no encontrados' });
    }
});

app.get('/menu.postre', (req, res) => {
    const platoPostre = menu.filter(item => item.tipo == "postre");
    if (platoPostre.length > 0) {
        res.json(platoPostre);
    } else {
        res.status(404).json({ error: 'Elementos de postre no encontrados' });
    }
});


app.post('/pedido2', (req, res) => {
    
    console.log(req.body); 
});



app.post('/pedido', (req, res) => {
    
    
    const  {platosPedidos } = req.body; 
    
    let total = 0;

    for (let i = 0; i < platosPedidos.productos.length; i++) {
       
        const platoId = platosPedidos.productos.id[i];
        const platoCantidad = platosPedidos.productos.cantidad[i];
        const plato = menu[platoId];
        
        total = total + (plato.precio * platoCantidad)

       
    }
    
    
    res.json({
        msg: "Pedido recibido",
        precio: total
        
    });
});


// Inicia el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

