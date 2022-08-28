// Módulos externos
const express = require("express");
const emoji = require("emoji-whale");
const cowsay = require("cowsay2");
const owl = require("cowsay2/cows/owl");
const whale = require("cowsay2/cows/whale");

const productsRoutes = require("./routes/productsRoutes");


// Módulos propios
const calc = require("./utils/calculator");
console.log(calc.add(10, 100));

// Variables globales
const app = express()
const port = 3000

// View engine
app.set('view engine', 'pug');
app.set('views','./views'); 

// Read body in POST
app.use(express.json());
// Router de productos
app.use("/products", productsRoutes);



///////////// RUTAS:


// GET: HOME
// http://localhost:3000
// http://127.0.0.1:3000
app.get('/', (req, res) => {
  console.log(emoji);
  console.log(cowsay.say("Hola!", { cow: owl }));
  //res.send('Hola desde mi primer servidor! '+emoji)
  let msj = 'Hola desde mi primer servidor! '+emoji;
  res.render("my_view",{section:"Home", msj}); // Renderizado en html ("template",{objeto});
});

// GET: http://localhost:3000/pokemon/Pikachu
app.get('/pokemon/:name?', (req, res) => {
    console.log(req.params);
    let msj = "";
    if (req.params.name) {
        msj = "Aquí te envio a: " + req.params.name;
    } else {
        msj = "Aquí te envío a todos los pokemon";
    }

  console.log(cowsay.say(msj, { cow: owl }));
  //res.send(msj+" "+emoji);
  res.render("my_view",{section:"Pokemon", msj});
});

// GET: http://localhost:3000/perritos
app.get('/perritos', (req, res) => {
  let msj = "¿Cuánto son 2+2?: "+calc.add(2,2);
  console.log(cowsay.say(msj, { cow: owl }));
  //res.send('Aquí te enviaría mis perritos y ... '+msj+" "+emoji);
  let msj2 = 'Aquí te enviaría mis perritos y ... '+msj+" "+emoji;
  res.render("my_view",{section:"Perritos", msj:msj2});
});


// Middleware de error 404
// Respuesta por defecto para rutas no existentes
app.use(function (req,res,next) {
  res.status(404).send('ERROR!! 404 not found :)');
});


// Listener lanazado al iniciar servidor
app.listen(port, () => {
  console.log(cowsay.say(`Mi servidor funciona en http://localhost:${port}`, { cow: whale }));
});