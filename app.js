const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
const xss = require("xss"); 
const html = xss('<script>alert("xss");</script>');

// masquer les mots de passes et identifiants
 require("dotenv").config();

const NAME = process.env.NAME;
const PASS = process.env.PASS;


const app = express();


const sauceRoute = require('./Routes/sauces');
const userRoute = require('./Routes/users');

const apiLimiter = rateLimit ( {   
  windowMs : 15 * 60 * 1000 ,     
  max : 500 // limite le nombre de requête par fenêtres
} ) ;

//console.log(html);

//identifiant et mot de passe mongodb local (à mettre sur atlas)
mongoose.connect(`mongodb://localhost/my_database`
,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));  

// CORS permettre aux différentes adresses de communiquer entre elles. 
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // convertir les objets json
  app.use(bodyParser.json());

  // chemin pour récupérer les images
  app.use('/images', express.static(path.join(__dirname, 'images')));

  // limiter les requêtes depuis une même adresse IP
  app.use('/api/', apiLimiter); 

  // définir le chemin des routes
  app.use('/api/auth/', userRoute);
  app.use('/api/sauces/', sauceRoute);

  
module.exports = app;