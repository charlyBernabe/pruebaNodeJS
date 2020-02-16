'use strict';
var express = require('express'),
    router = express.Router(); //Routing;

const controladorFile = require('../../../interfaces/controladores/controladorFiles');



router.post('/saveFiles', controladorFile.persistFacturas);
router.get('/getInfo', controladorFile.extractInfo);

module.exports = router;