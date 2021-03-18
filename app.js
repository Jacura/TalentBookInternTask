var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose =
        require("passport-local-mongoose"),
    User = require("./models/user");
 

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/TalentBook");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 
//ROUTES

app.get("/", function (req, res) {
    res.render("home");
});

// Showing secret page 
app.get("/Mypage", isLoggedIn, function (req, res) {
    res.render("Mypage");
});

// Showing register form 
app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/survey",function(req,res){
    res.render("survey");
})

// Handling user signup 
app.post("/register", function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var age = req.body.age
    var email = req.body.email
    var bestme = req.body.bestme
    var FCC = req.body.FCC
    var futureimprovements = req.body.futureimprovements
    var willyouprefercodecamp =req.body.willyouprefercodecamp
    User.register(new User({ username: username,email:email ,age:age,bestme:bestme,willyouprefercodecamp:willyouprefercodecamp,FCC:FCC,futureimprovements:futureimprovements}),
        password, function (err, user) {
            if (err) {
                console.log(err);
                return res.render("register");
            }

            passport.authenticate("local")(
                req, res, function () {
                    res.render("Mypage");
                });
        });
});
 
     
//Showing login form 
app.get("/login", function (req, res) {
    res.render("login");
});

//Handling user login 
app.post("/login", passport.authenticate("local", {
    successRedirect: "/Mypage",
    failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout 
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});
