var express    = require("express"),
    app        = express(),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    User       = require("./models/user"),
    seedDB     = require("./seeds"),
    methodOverride = require("method-override"),
    port       = process.env.port || 3000;


var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelpcamp_8_deployed", {useNewUrlParser: true});
mongoose.connect("mongodb://ahmed:3297Selly0512922@ds145168.mlab.com:45168/travelcamper", {useNewUrlParser: true});
// mongodb://ahmed:3297Selly0512922@ds145168.mlab.com:45168/travelcamper
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
app.use(methodOverride("_method"));

// seedDB(); //seed database

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Rujy is the cutest cat ever",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Campground.create({
//   name: "Mountains",
//   image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80",
//   description: "Best View Ever"
// }, function(err, campground){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Newly created campground");
//     console.log(campground);
//   }
// });

app.listen(port, function(){
  console.log("Server is on port " + port);
});
