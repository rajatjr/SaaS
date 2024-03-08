const express = require("express");
const router = express.Router();
const { createOrganization,getAllOrganizations, getOrganizationById, updateOrganizationById,deleteOrganizationById,loginorganization }=require('../Controlers/OrganizationController');



router.post('/createOrganization', createOrganization);
router.post('/organizationlogin',loginorganization)
router.get('/getAllOrganizations', getAllOrganizations);
router.get("/getOrganizationById/:_id", getOrganizationById);
router.patch("/updateOrganizationById/:_id",updateOrganizationById)
router.delete('/deleteOrganizationById/:_id', deleteOrganizationById);


module.exports =router;