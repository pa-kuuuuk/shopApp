const express = require('express');
const multer = require('multer');
const router = express.Router();

//=================================
//            Product
//=================================

var storage = multer.diskStorage({
    //어디에 저장 될 것인지 우리는 (root에다가 upload 폴더를 만들어서 저장)
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+file.originalname)
    }
  })
     
  var upload = multer({ storage: storage }).single("file");

router.post('/image',(req,res) => {

    //가져온 이미지를 저장을 해주면 된다. 
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })

})

module.exports = router;
