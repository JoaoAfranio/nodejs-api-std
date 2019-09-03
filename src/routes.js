const express = require('express');

const ProdutoController = require('./controllers/ProdutoController');

const routes = express.Router();

routes.get('/produtos' , ProdutoController.index);
routes.post('/produtos' , ProdutoController.store);
routes.get('/produtos/:prodID' , ProdutoController.show);
routes.put('/produtos/:prodID', ProdutoController.update);


//routes.get('/produtos/somar/' , ProdutoController.somaPreco);


module.exports = routes;