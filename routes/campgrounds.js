var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware"),
    geocoder    = require("geocoder");

// INDEX - Show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           res.redirect("/projects/yc/campgrounds");
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
       }
    });
});

// New Campground Route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var price = req.body.price;
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = {name: name, image: image, description: desc, price: price, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            req.flash("success","Successfully Added New Campground!");
            res.redirect("/projects/yc/campgrounds");
        }
    });
  });
});

//Show Campground by ID
router.get("/:id", function(req, res){
    // Find campground with selected id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
         // Render page
         res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//Update
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.campground.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.campground.name, image: req.body.campground.image, description: req.body.campground.description, price: req.body.campground.price, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/projects/yc/campgrounds/" + campground._id);
        }
    });
  });
});

//Destroy

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
            res.redirect("/projects/yc/campgrounds");
       } else {
           req.flash("success","Successfully Deleted Campground");
           res.redirect("/projects/yc/campgrounds");
       }
   });
});

module.exports = router;