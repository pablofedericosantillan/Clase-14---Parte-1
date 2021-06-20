"use strict";
exports.__esModule = true;
var Productos = /** @class */ (function () {
    function Productos() {
        this.item = [];
    }
    Productos.prototype.listarTodos = function () {
        try {
            return this.item.length != 0 ? this.item : { error: 'no hay productos cargados' };
        }
        catch (err) {
            console.log('Hubo un error en la funcion leer todo');
        }
    };
    Productos.prototype.BuscarId = function (id) {
        try {
            return id <= this.item.length ? this.item[id - 1] : { error: "producto no encontrado'" };
        }
        catch (err) {
            console.log('Hubo un error en la funcion Buscar por ID');
        }
    };
    Productos.prototype.guardar = function (newProduct) {
        try {
            this.item.push(newProduct);
            return this.item;
        }
        catch (err) {
            console.log('Hubo un error en la funcion guardar');
        }
    };
    return Productos;
}());
/*-----------------------------------------------------------------------*/
var express = require("express");
var productos = new Productos;
// creo una app de tipo express
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*-----------------------------------------------------------------------*/
//Endpoints
app.get('/', function (req, res) {
    res.send('Bienvenido al desafio Entregable de la Clase 14');
});
app.get('/listar', function (req, res) {
    res.json(productos.listarTodos());
});
app.get('/listar/:id', function (req, res) {
    res.json(productos.BuscarId(req.params.id));
});
app.post('/guardar', function (req, res) {
    req.body.id = productos.item.length + 1;
    productos.item = productos.guardar(req.body);
    res.send(req.body);
});
/*-----------------------------------------------------------------------*/
// pongo a escuchar el servidor en el puerto indicado
var puerto = 8080;
var server = app.listen(puerto, function () {
    console.log("servidor escuchando en http://localhost:" + puerto);
});
server.on('error', function (error) {
    console.log('error en el servidor:', error);
});
