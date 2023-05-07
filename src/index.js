//import express from 'express';
const express = require('express');

const app = express();

const memory = [{
    nombre: "Diego",
    fecha: "05022023",
},
{
    nombre: "Maria",
    fecha: "05022223",
},
{
    nombre: "Paco",
    fecha: "08102223",
},
{
    nombre: "Ana",
    fecha: "11112223",
},
{
    nombre: "Daniel",
    fecha: "12122223",
}];

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.post('/todo', (req, res) => {
    console.log(req);
    const { nombre, fecha } = req.body;
    const save = {nombre, fecha};
    memory.push(save);

    const solution = `${nombre} a devolver, ${fecha} creada`;
    const bodyToSend = { msg: solution }
    res.json(memory);
});

app.get('/todo/:nombre', (req, res) => {
    const { nombre } = req.params;
    /*const  find = memory.filter(elem=>{

        return elem.nombre === nombre;
    });*/
    /* Forma extendida de hacer el find
    const find = memory.find (elem=>{
        
        return elem.nombre === nombre;

    })
    */
    const find = memory.find (elem=>elem.nombre === nombre);

    if (find !== undefined){

        res.json(find)
    }
    else{
        const status = {msg: 'not found'}
        res.status(404).json(status)
    }
    
    const a = '1';
    console.log('Comprobacion, ', 1===a,'doble igual', 1==a);
    //res.send(nombre);

});

app.get('/todo', (req, res)=>{

    res.json(memory);
});

app.listen(port, () => { console.log('Servidor listo en le puerto', port) })

