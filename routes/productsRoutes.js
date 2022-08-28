// RUTAS DE PRODUCTOS

const express = require('express');

const productsController = require("../controllers/productsController")
const productsRouter = express.Router();

// GET: http://localhost:3000/products
productsRouter.get('/:id?', productsController.getProducts);
  
// POST: http://localhost:3000/products
productsRouter.post('/', productsController.createProduct);

// DELETE: http://localhost:3000/products
productsRouter.delete("/", productsController.deleteProduct);

module.exports = productsRouter;