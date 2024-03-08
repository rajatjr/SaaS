const express = require("express");
const router = express.Router();
const { addSubscription, getSubscription, deleteSubscription ,UpdateSubscription}=require('../Controlers/SubscriptionController');


router.post('/addSubscription', addSubscription);
router.get('/getSubscription', getSubscription);
router.delete("/delete", deleteSubscription);
router.patch("/updatesubscription",UpdateSubscription)



module.exports =router;