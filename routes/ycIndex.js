var express  = require("express"),
    router   = express.Router(),
    User     = require("../models/user"),
    passport = require("passport");

//////////////////////
// YelpCamp Routes  //
//////////////////////

router.get("/", function(req, res){
   res.render("index"); 
});

//New Register
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

//Create Register
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username +"!");
            res.redirect("/projects/yc/campgrounds"); 
        });
    }); 
});

//Login Form Route
router.get("/login", function(req, res){
    res.render("login", {page: "login"}); 
});

//Logic for Login Form
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/projects/yc/campgrounds",
        failureRedirect: "/projects/yc/login"
    }), function(req, res){
    
});

//Logout Route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged You Out!");
   res.redirect("/projects/yc/campgrounds");
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/projects/yc/login");
}

module.exports = router;