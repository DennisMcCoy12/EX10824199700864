var express =require('express');
var router = express.Router();
var fileModel =require('../filemodel');

var galCollection =fileModel.getGaleria();

router.post('/new', function(req,res){
    galCollection=fileModel.getGaleria();
    var newGaleria=Object.assign(
        {},
        req.body,
        {
            "url": req.body.url,
            "thumbnailUrl":req.body.thumbnailUrl

        }
    );
    var galExist=galCollection.find(
        function(o,i){
            return o.id===newGaleria.id;
        }
    )
    if(!galExist){
        galCollection.push(newGaleria);
        fileModel.setGaleria(
            galCollection,
            function(err, savedSuccesfully){
                if(err){
                    res.status(400).json({"error":"No se pudo agregar la imagen"});
                }else{
                    res.json(newGaleria);
                }
            }
            );

    }else{
        res.status(400).json({"error":"No se pudo agregar la imagen"});
    }

});

module.exports=router;