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

router.get('/all', function(req,res){
    galCollection=fileModel.getGaleria();
    res.json(galCollection);
});

router.delete(
    '/delete/:galid',
    function(req,res){
        galCollection=fileModel.getGaleria();
        var galIdToDelete=req.params.galid;
        var newGalCollection=galCollection.filter(
            function(o,i){
                return galIdToDelete!=o.id;
            }
        );
        galCollection=newGalCollection;
        fileModel.setGaleria(
            galCollection,
            function(err,savedSuccesfully){
                if(err){
                    res.status(400).json({"error":"No se pudo eliminar la imagen"});
                }else{
                    res.json({"newGAlQty":galCollection.length});
                }
            }
        )
    }
);

router.put('/update/:galid',
  function(req, res){
      galCollection = fileModel.getGaleria();
      var galidToModify = req.params.galid;

      var urlToModi = req.body.urlTM;
      var thumbnailUrlToModi = req.body.thumbnailUrlTM;
      var modGaleria = {};
      var newGaleriaArray = galCollection.map(
        function(o,i){
          if( galidToModify === o.id){
             o.url = urlToModi;
             o.thumbnailUrl=thumbnailUrlToModi;
             modGaleria = Object.assign({}, o);
          }
          return o;
        }
      );
    galCollection = newGaleriaArray;
    fileModel.setGaleria(
      galCollection,
      function (err, savedSuccesfully) {
        if (err) {
          res.status(400).json({ "error":"No se pudo modificar la imagen" });
        } else {
          res.json(modGaleria);
        }
      }
    );
  }
);

module.exports=router;