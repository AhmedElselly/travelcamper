var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground");


router.get("/", function(req, res){
  //getting all campgrounds from database
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else{
      res.render("campgrounds/campgrounds", {campgroundVar: allCampgrounds, currentUser: req.user});
    }
  });
});

router.post("/", isLoggedIn,function(req, res){
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc  = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  }
  var newCampground = {name: name, price: price, image: image, description: desc, author: author};
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else{
      res.redirect("/campgrounds");
    }
  });
});

router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/form", {currentUser: req.user});
});

//the showing page route for every individual campground
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else{
      console.log(foundCampground);
      res.render("campgrounds/show", {campgroundVar: foundCampground, currentUser: req.user});
    }
  });
});


//Edit campground route
router.get("/:id/edit", checkCampgroundOwnerShip,function(req, res){
  //is user logged in?
    Campground.findById(req.params.id, function(err, foundCampground){
          res.render("campgrounds/edit", {campgroundVar: foundCampground, currentUser: req.user});
    });
});

//update campground route
router.put("/:id", checkCampgroundOwnerShip, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else{
        res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//remove campground route
router.delete("/:id", checkCampgroundOwnerShip, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
        res.redirect("/campgrounds");
      } else{
        res.redirect("/campgrounds");
      }
    });
});

//middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

function checkCampgroundOwnerShip(req, res, next){
   //is user logged in?
   if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
          res.redirect("back");
      } else{
        if(foundCampground.author.id.equals(req.user._id)){
          next();
        } else{
          res.redirect("back");
        }
      }
    });
  } else{
      res.redirect("back");
  }
}

module.exports = router;
