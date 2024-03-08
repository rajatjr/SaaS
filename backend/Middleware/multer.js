// const multer = require("multer");
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
    
//       cb(null, file.fieldname + '-' +Date.now()+"-"+file.originalname);
//       console.log("FILE UPLOADED")
//     }
    
//     });
  
//    function multerfilter(req,file,cb){
//     console.log(file.mimetype);
//     if(file.mimetype.split("/")[1]==='jpeg'|| file.mimetype.split("/")[1] === 'png'|| file.mimetype.split("/")[1] === 'jpg')
//     {
//       cb(null,true);
    
//     }
//     else{
//       cb(new Error("NOT IN FORMAT"),false);
//     }
//    };
// const upload=multer({storage:storage})

// module.exports=upload


const multer = require('multer');
const { validationResult } = require('express-validator'); // Import validationResult

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + '-' + file.originalname); // Set a unique filename for each uploaded file
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

module.exports=upload