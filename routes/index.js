var express  = require("express"),
    router   = express.Router(),
    User     = require("../models/user"),
    passport = require("passport");

//Route Routes
router.get("/", function(req, res){
   res.render("home"); 
});

router.get("/projects/ColorGame", function(req, res){
   res.render("colorGame"); 
});

router.get("/projects/ParatapClone", function(req, res){
   res.render("paratapIndex"); 
});

router.get("/projects/MountainTravel", function(req, res){
   res.render("mountainTravels"); 
});

router.get("/projects/yc", function(req, res){
   res.render("landing"); 
});

module.exports = router;