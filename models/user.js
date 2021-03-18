var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");
var UserSchema=mongoose.Schema({
username: String,
email :String,
age: Number,
bestme:String,
 willyouprefercodecamp:String,
 FCC:String,
 futureimprovements:String,
Password: String
 
});

UserSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model("User", UserSchema);