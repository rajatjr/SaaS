const express = require('express')
const router = express.Router();
const { UserSingup, UserLogin,getuser,UpdateActive, DeleteUser,GetAllUser} = require("../Controlers/UsersController");
router.post('/usersignup', UserSingup);
router.post('/userlogin', UserLogin);
router.get("/getuser",getuser);
router.get('/getalluser',GetAllUser);
router.patch("/updateactive/:_id", UpdateActive);
router.delete("/deleteuser/:_id", DeleteUser);



module.exports = router;