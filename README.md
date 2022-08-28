# clase_14
Express: API REST

MVC (modelo-vista-controlador)
ROUTING (clase_12 en git):

-La lógica de negocio de las rutas deben de ir en otra parte. Entonces creamos las carpetas "controllers", "routes" y "models".

-Models: Irá todo el código de BBDD




-CARPETA CONTROLLERS

-En "controllers" se crea un archivo "productsController.js", que es donde irán cada una de las funciones asociadas a cada ruta (la lógica de negocio).

-El término Modelo-vista-controlador (carpetas models, views, controllers) es el patrón más común para desarrollo web

-Este se encontrará dentro del servidor Express

-Con este patrón de desarrollo, la base de datos (model) y la vista no se tienen que tocar (desde el JS del DOM no se debe tocar la base de datos). Tiene que haber un ente intermedio, que es el controlador el que sea el encargado de hacer las peticiones a la base de datos (buscar esquema en google)


-A continuación, se externalizarán funciones:

-En "productsController.js" se escribe la estructura del objeto para guardar las funciones callback y el módulo para exportar:

const products = {
    getProducts: "callback func",
    createProduct: "callback func",
};

module.exports = products;

-Copiamos las funciones GET products y POST products


-Otra forma de estructurar estas funciones es con el patrón Facade. Las funciones se definene como variables (en lugar de definirlas como métodos del objeto products) y la exportación se realiza en un objeto, llamando a las funciones como propiedades. Esto tiene la ventaja de que se puede visualizar en "module.exports" claramente lo que se está exportando, o comentarlo... Al final la dos formas devuelven un objeto.




-CARPETA ROUTES

-En la carpeta "routes" se crea el archivo "productsRoutes.js" y se escribe la declaración: "const productsRouter = express.Router();"

-Luego copiamos las rutas GET products y POST products del archivo "app.js" y lo pegamos en "productsRoutes.js" y se sustituye el objeto "app" de ambas rutas por "productsRouter"

-Se exporta, con la declaración: "module.exports = productsRouter"

-Se importa el controlador que se ha creado anteriormente: "const productsController = require("../controllers/productsController")"

-En las rutas GET y POST borramos el código las funciones callback (segundo parámetro) y lo sustituímos con los métodos "productsController.getProducts" y "productsController.createProduct"





-PARA CREAR UN DELETE PRODUCT:

-En "app.js" se tiene un "app.delete("/", (req, res) => {" de prueba, así que vamos a habilitarlo para products:

-Añadimos la ruta "products" --> "app.delete("/products", (req, res) => {"

-Lo copiamos a productsRoutes.js y sustituimos el "app" por "productsRouter" --> "productsRouter.delete("/products", (req, res) => {"

-En productsController creamos el controlador con la función callback (lógica de negocio) --> "const deleteProduct = async + func callback DELETE desde productsRoutes" y la exportamos en el objeto "module.exports" con la propiedad "deleteProduct"

-En productRoutes se borra el código de la callback y se sustituye por "productsController.deleteProduct"





-INVOCACIÓN DE RUTAS PRODUCTS DESDE APP.JS:

-Se borra todas las rutas que tengan que ver con products (en app.js!!!)

-En "app.js" se importan las rutas de productos. En módulos externos --> "const productsRoutes = require("./routes/productsRoutes");". No haría falta importar también el controlador, porque ya se importa en "productsRoutes"

-Se copia el objeto "app.use("/", productsRoutes);" bajo "app.use(express.json())"

-En "productsRoutes" hay que importar Express, escribiendo: "const express = require('express');"

-Se instala node-fetch --> "npm i node-fetch@2" y se importa en "productsController" --> const fetch = require('node-fetch');

-Para simplificar las rutas en "productsRoutes", se puede quitar "products": ...get('/products/:id?' -> ...get('/:id?' (igual con POST y DELETE), y colocarlo en el Router de productos creado en "app.js": app.use("/", productsRoutes); -> app.use("/products", productsRoutes);



-SE CREAN LOS CATCH PARA CONTROLAR LOS ERRORES

-En "productsController", en la función GET products, se crea un render en el catch --> "res.render('products', { 'products': [] });" y para el segundo catch --> res.render('products', {products:[]});

-Hacemos los mismos pasos en la función POST products




-PARA AÑADIR CÓDIGOS DE STATUS:

-En "HTTP CAT" están los códigos para comprobar el status

-Ejemplo para GET products. Si ha conseguido dar los datos se le puede añadir el código con ese significado (que es el 200). Para ello, se añade en "res.render(...)" -> "res.status(200).render(...)". Cuando responde bien GET, el código suele ser 200. Se hace igual con todas las respuestas de GET. Si falla el GET (en catch) el código suele ser 404 ("not found"). El 201, es para cuando se ha creado algo.




-MIDDLEWARE:

-Es una operación intermedia que hace comprobaciones, como por ejemplo, saber si la ruta existe. Si esta no existe, hará lo que le indiquemos

-Añadimos en "app.js" el código: "app.use(function (req,res,next...". Se añade en el archivo principal porque va a funcionar de tal forma que va a ser el que lea primero de todos y de forma secuencial. Entonces va a intentar secuencialmente todas las rutas que lea, y si ninguna coincide, llegará a "app.use(function (req,res,next...", que estará al final y tirará el 404. Es como si fuera un if..else, por si ha fallado todo. Por ejemplo, si escribimos "http://localhost:3000/cnruo3bcu", va a lanzar el mensaje de error.

-Más adelante, se creará la carpeta middlewares, que manejan las incoming request antes de pasarlo a las rutas para que lo manejen. Por ejemplo, se puede meter un middleware para comprobar si hay ApiKey o no