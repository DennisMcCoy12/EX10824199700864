var express =require('express');
var router = express.Router();

var galeriaApiRoutes= require('./galeria/index');

router.use('/gal', galeriaApiRoutes );

module.exports=router;