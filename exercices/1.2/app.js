var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var filmsRouter = require('./routes/films');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const stats = {};
//Création d'un objet vide appelé 'stats' pour stocker les statistiques des requêtes.

app.use((req, res, next) => {
    //Il définit un middleware avec app.use(...). 
    //Les middlewares Express sont des fonctions qui 
    //s'exécutent à chaque fois qu'une requête HTTP est reçue avant de passer à la route suivante ou d'envoyer une réponse. 
    //Dans ce cas, le middleware suit les statistiques des requêtes.
  const currentOperation = `${req.method} ${req.path}`;
  //Dans ce middleware, il commence par extraire la méthode HTTP (req.method) 
  //et le chemin d'accès (req.path) de la requête actuelle. 
  //Ces informations sont utilisées pour identifier l'opération en cours.
  const currentOperationCounter = stats[currentOperation];
  //l vérifie si l'opération actuelle (définie par la méthode et le chemin d'accès) existe dans l'objet stats en vérifiant si stats[currentOperation] est défini.
  const myStats= {'GET /':1, 'GET /films': 3}
  if (currentOperationCounter === undefined) stats[currentOperation] = 0;
  //Si l'opération actuelle n'existe pas dans les statistiques, il l'initialise à 0.
  stats[currentOperation] += 1;
  //Ensuite, il incrémente le compteur pour l'opération actuelle dans l'objet stats.
  const statsMessage = `Request counter : \n${Object.keys(stats)
    .map((operation) => `- ${operation} : ${stats[operation]}`)
    .join('\n')}
      `;
      //Il génère un message de statistiques à partir de l'objet stats, qui répertorie le nombre de requêtes pour chaque opération.
  console.log(statsMessage);
  next();
  //Enfin, il appelle next() pour passer la requête au middleware ou à la route suivante.
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/films', filmsRouter);

module.exports = app;