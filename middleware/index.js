var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.")
    res.redirect("/projects/yc/login");
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err, foundComment){
           if(err || !foundComment){
               console.log(err);
               req.flash('error', 'Sorry, that comment does not exist!');
               res.redirect('/campgrounds');
           } else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                req.comment = foundComment;
                next();
           } else {
               req.flash('error', 'You don\'t have permission to do that!');
               res.redirect('/projects/yc/campgrounds/' + req.params.id);
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
          if(err || !foundCampground){
              console.log(err);
              req.flash('error', 'Sorry, that campground does not exist!');
              res.redirect('/projects/yc/campgrounds');
          } else if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
              req.campground = foundCampground;
              next();
          } else {
              req.flash('error', 'You don\'t have permission to do that!');
              res.redirect('/projects/yc/campgrounds/' + req.params.id);
          }
        });
    } else {
        res.redirect("back");
    }
};

module.exports = middlewareObj;