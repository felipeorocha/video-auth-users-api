const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const cors = require('cors');

const db = 'mongodb://127.0.0.1:27017';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

app.use('/api', router);

const rotas = require('./app/routes/rotas');

router.route('/usuarios')
  .get(require('./validarJWT'), rotas.getUsuarios)
  .post(rotas.postUsuarios);

router.route('/login')
  .post(rotas.login);

router.route('/videos')
  .get(rotas.getVideos)
  .post(rotas.postVideos);

mongoose.connect(db);

app.listen(8080, () => {
  console.log('conectado a porta 8080');
});
