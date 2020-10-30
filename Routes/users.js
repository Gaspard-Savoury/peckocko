const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const userCtlr = require('../Controllers/user');

// les deux routes pour l'inscription et la connexion

// limite du nombre de création de comptes par la même adresse IP
const createAccountLimiter = rateLimit ( { 
  windowMs : 60 * 60 * 1000 , // une heure      
  max : 300 , //  nombre maximal de requêtes
  message :
    " Trop de comptes créés à partir de cette adresse IP, veuillez réessayer après une heure "
} ) ;

router.post('/signup', createAccountLimiter, userCtlr.signUp);
router.post('/login',  userCtlr.login);

module.exports = router;