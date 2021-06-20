'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Productos = function () {
    function Productos() {
        _classCallCheck(this, Productos);

        this.item = [];
    }

    _createClass(Productos, [{
        key: 'listarTodos',
        value: function listarTodos() {
            try {
                return this.item.length != 0 ? this.item : { error: 'no hay productos cargados' };
            } catch (err) {
                console.log('Hubo un error en la funcion leer todo');
            }
        }
    }, {
        key: 'BuscarId',
        value: function BuscarId(id) {
            try {
                return id <= this.item.length ? this.item[id - 1] : { error: "producto no encontrado'" };
            } catch (err) {
                console.log('Hubo un error en la funcion Buscar por ID');
            }
        }
    }, {
        key: 'guardar',
        value: function guardar(newProduct) {
            try {
                newProduct.id = this.item.length + 1;
                this.item.push(newProduct);
                return this.item;
            } catch (err) {
                console.log('Hubo un error en la funcion guardar');
            }
        }
    }]);

    return Productos;
}();

/*-----------------------------------------------------------------------*/


var express = require('express');
var productos = new Productos();
// creo una app de tipo express
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*-----------------------------------------------------------------------*/
//Endpoints
app.get('/', function (req, res) {
    res.send('Bienvenido al desafio Entregable de la Clase 8');
});
app.get('/listar', function (req, res) {
    res.json(productos.listarTodos());
});
app.get('/listar/:id', function (req, res) {
    res.json(productos.BuscarId(req.params.id));
});
app.post('/guardar', function (req, res) {
    productos.item = productos.guardar(req.body);
    res.send(req.body);
});

/*-----------------------------------------------------------------------*/
// pongo a escuchar el servidor en el puerto indicado
var puerto = 8080;
var server = app.listen(puerto, function () {
    console.log('servidor escuchando en http://localhost:' + puerto);
});
server.on('error', function (error) {
    console.log('error en el servidor:', error);
});
