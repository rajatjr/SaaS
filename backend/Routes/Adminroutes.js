const express = require("express");
const router = express.Router()
const { AdminSingUp,AdminLogin }=require('../Controlers/AdminController')
router.post("/adminsingup",AdminSingUp)
router.post("/adminlogin",AdminLogin)
// router.post("/addPlans",addplans)
module.exports =router;
