const express = require('express');
const router = express.Router();
const apiDiscovery = require('../controllers/apiDiscovery');
const middlewareAssistant = require('../middlewares/apiAssistant');

router.post('/query', middlewareAssistant.detectarIntencion, apiDiscovery.queryCollection); //cambiar el nombre "queryCollection" por el nombre de la función que editamos en controllers/apiDiscovery.js

module.exports = router;