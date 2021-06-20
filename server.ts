class Productos {
    item:Array<object>;
    constructor(){
        this.item = [];
        }
    listarTodos() {
            try{
                return this.item.length!=0 ? this.item : {error : 'no hay productos cargados'}  
               }catch(err){
                console.log('Hubo un error en la funcion leer todo'); 
               }
    }
    BuscarId(id:number){
        try{
            return id <= this.item.length ? this.item[id-1] : {error: "producto no encontrado'" }
           }catch(err){
            console.log('Hubo un error en la funcion Buscar por ID'); 
           }
    }
    guardar(newProduct : object){
        try{
            this.item.push(newProduct);
            return this.item;
           }catch(err){
            console.log('Hubo un error en la funcion guardar'); 
           }
    }
 }

/*-----------------------------------------------------------------------*/
import express = require ('express');
import { SelectionRange } from 'typescript';
const productos = new Productos;
// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*-----------------------------------------------------------------------*/
//Endpoints
app.get('/', (req, res) => {
    res.send('Bienvenido al desafio Entregable de la Clase 14');
});
app.get('/listar', (req, res) => {
         res.json(productos.listarTodos()) 
});
app.get('/listar/:id', (req, res) => {
    res.json(productos.BuscarId(req.params.id)) 
});
app.post('/guardar', (req, res) => {
    req.body.id= productos.item.length+1;
    productos.item=productos.guardar(req.body)
res.send(req.body);
});

/*-----------------------------------------------------------------------*/
// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});
server.on('error', error => {
    console.log('error en el servidor:', error);
});
