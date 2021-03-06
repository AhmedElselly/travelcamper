var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment");

//================
//COMMENTS ROUTES
//================

router.get("/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else{
      res.render("comments/new", {campgroundVar: campground, currentUser: req.user});
    }
  });
});

router.post("/", isLoggedIn,function(req, res){
  //look up campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else{
      //create new commments
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else{
            //add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //saving comment
            comment.save();
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
      //connect new comment to campground
      //redirect to campground show page
    }
  });
});


//=====================
// Edit comments route
//=====================

router.get("/:comment_id/edit", checkCommentOwnership,function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else{
      res.render("comments/edit", {campgroundVar_id: req.params.id, comment: foundComment, currentUser: req.user});
    }
  });
});

//Comment Update Route

router.put("/:comment_id", checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Comment delete route
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else{
      res.redirect("/campgrounds/" + req.params.id);
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

function checkCommentOwnership(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else{
        if(foundComment.author.id.equals(req.user._id)){
          next();
        }else{
          res.redirect("back");
        }
      }
    });
  } else{
    res.redirect("back");
  }
}


module.exports = router;
