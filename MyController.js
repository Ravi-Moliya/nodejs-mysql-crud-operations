require('dotenv').config();
var myModel = require('../models/MyModel');
var nodemailer = require("nodemailer");
var db = require('../config/database.js');

bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const country = require('countryjs'); 

const secretJWTKey = process.env.SECRETJWTKEY;

const url = require('url'); 
var MySessionVariable;

var smtpTransport = nodemailer.createTransport({
    service: process.env.SMTPGMAIL,
    host: process.env.SMTPHOST,
    port: process.env.SMTPPORT,
    auth: {
        user: process.env.SMTPEMAIL,
        pass: process.env.SMTPPASSWORD
    },
    tls: {rejectUnauthorized: false},
    debug:true
});
exports.renderLoginPage = (req,res)=>{
    res.render('Login');
}
exports.renderSignUpPage = (req,res)=>{
   
    res.render('SignUp');
}
exports.renderMemberRecordPage = (req,res)=>{
    res.render('MemberRecord');
}
exports.renderForgetPasswordPage = (req,res)=>{
    res.render('ForgetPassword');
}
exports.renderConfirmPasswordPage = (req,res)=>{
    res.render('ConfirmPassword');
}
exports.renderUserProfilePage = (req,res)=>{
    const MySetCookieToken = req.cookies.CookieTokenVariable;
    console.log(MySetCookieToken);
    if (!MySetCookieToken) {
        res.redirect("/Login");
    }
    console.log(secretJWTKey);
    var User
      try {
        User = jwt.verify(MySetCookieToken, secretJWTKey);
      } 
      catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            
            console.log(e);
          res.redirect("/");
        }
        res.redirect("/");
      }
   
    
    res.render('UserProfile');
}
  

exports.FetchRecord = async(req,res)=>{
    var STR = req.query.KeypressByUser;
    var findOPS = req.query.FindOps;
    
    if(findOPS == process.env.SELECTALLASPERBTN)
    {
        var searchData = {
            countryName:STR[0],
            stateName:STR[1],
            cityName:STR[2]
        }
        var pop = await myModel.FetchSearchData(searchData);
    }
    else if(findOPS == process.env.SELECTALLASPERCOUNTRY)
    {    
        
        var pop = await myModel.FetchSortData("country.countryName");
    }
    else if(findOPS == process.env.SELECTALLASPERSTATE)
    {
        var pop = await myModel.FetchSortData("state.stateName");
    }
    else if(findOPS == process.env.SELECTALLASPERCITY)
    {
        var pop = await myModel.FetchSortData("city.cityName");
    }
    else
    {
        var pop = await myModel.FetchData();
    }
    res.send(pop);  
}
exports.Authonticate = async(req,res)=>{
    
    var userName = req.param(process.env.TXTUSERNAME,null);
    var password = req.param(process.env.TXTPASSWORD,null);

    var pass,email ;
    sql = "SELECT Admin_Email ,Admin_Password FROM admin WHERE Admin_Email = '"+userName +"'"
    
    db.query(sql,function(err,result){
        if(err) throw err;
       
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            pass = row.Admin_Password;   
            email = row.Admin_Email;
           
        });
            
            var match = bcrypt.compare(password, pass);
            if(email==userName){
                if(match) {
                    
                    MySessionVariable = req.session;
                    MySessionVariable.userName = userName;
                    MySessionVariable.password = password;

                    var EmailID = userName;
                    const MyJWTToken = jwt.sign({ EmailID }, secretJWTKey, {
                        algorithm:process.env.ALGORITHM,
                        expiresIn: process.env.EXPIRESIN
                    });
                    MAXAGE = process.env.MAXAGE;
                    
                    res.cookie('CookieTokenVariable', MyJWTToken, { maxAge:MAXAGE});
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    dateTime = date+' '+time;
                    myModel.updateLastLogin(userName,dateTime);
                   
                    res.set(200).json(MyJWTToken);
                    
                    
                 }
                 else{
                   
                    res.set(200).json("Password");
                }
            }else{
                res.set(200).json("Email");
            }
         
    });
    
}
exports.send = (req,res)=>{
    var user = req.query.to;
    sql = "SELECT Admin_Email FROM admin WHERE (Admin_Email =? )"
    db.query(sql,user,function(err,result){
        if(err)
        {
            throw err;
        }
        else
        {
            if(result.length == process.env.ZERO)
            {
                res.send("Enter Registerd EmailID Please...")
            }
            else
            {
                MySessionVariable = req.session;
                MySessionVariable.user = user;

                var EmailID = user;
                const MyJWTToken = jwt.sign({EmailID},secretJWTKey,{
                    algorithm:process.env.ALGORITHM,
                    expiresIn:process.env.EXPIRESIN
                });
               
                var mailOptions={
                    from:process.env.SMTPEMAIL,
                    to : req.query.to,
                    subject : req.query.subject,
                    text:'<a>click here</a>',
                    html: '<h1>Click <a href="http://localhost:3000/ConfirmPassword?user='+MyJWTToken+'" target="_blank">here</a> to reset your password</h1>'
                };
               
               smtpTransport.sendMail(mailOptions, function(error, res){
                    
                   if(error){
                    
                    res.send("error");
                    }else
                    {
                       
                        console.log("Message sent: " + res.messageId);
                            
                    }
                });
                res.cookie('CookieToken', MyJWTToken, { maxAge: process.env.MAXAGE });
                res.send(MyJWTToken);
            }
        }
    });
}
exports.UpdatePassword = (req,res)=>{
    
    const MySetCookieToken = req.cookies.CookieToken;
    
    console.log(req.cookies.CookieToken);

    if (!MySetCookieToken) {
        res.redirect("/");
    }
    var User;
      try {
        User = jwt.verify(MySetCookieToken, secretJWTKey);
      } 
      catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
          res.redirect("/");
        }
        res.redirect("/");
      }


    var newpassword = req.param(process.env.TXTPASSWORD,null); 
    var EmailID = User.EmailID;
    myModel.updatePassword([EmailID,newpassword],(err)=>{
        if(err) throw err; 
    });
    res.send("Successfully Reset Password");
}
exports.InsertRecord = async(req,res)=>{

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    dateTime = date+' '+time;
    var countryISO3Code="";
    
    var Admin_Email=process.env.ADMIN_EMAIL;
        var x = await myModel.checkEmail(Admin_Email);
        
        if(x == process.env.EMAILREGISTERED){
            res.send(process.env.EMAILREGISTERED);
        }
        else
        {   var mycountryName=req.param(process.env.COUNTRYNAME,null);
           
            countryISO3Code = country.ISOcodes(mycountryName, 'name');
            
            var countryCurrencyCode = country.currencies(mycountryName, 'name');
            var countryDialCode =country.callingCodes(mycountryName, 'name');
            var CountryData = {
                countryName:mycountryName,
                countryStatus:process.env.ACTIVE,
                countryISO3Code:countryISO3Code.alpha3,
                countryISO2Code:countryISO3Code.alpha2,
                countryCurrencyCode:countryCurrencyCode[0],
                countryDialCode:countryDialCode[0],
                countryCreatedDate:dateTime
            }
            var StateData = {
                countryName:mycountryName,
                stateName:req.param(process.env.STATENAME,null),
                stateStatus:process.env.ACTIVE,
                stateCreatedDate:dateTime
            }
            var CityData = {
                countryName:mycountryName,
                stateName:req.param(process.env.STATENAME,null),
                cityName:req.param(process.env.CITYNAME,null),
                cityStatus:process.env.ACTIVE,
                cityCreatedDate:dateTime
            }
            var userData = {
            
                Admin_Name:req.param(process.env.ADMIN_NAME,null),
                Admin_Email:req.param(process.env.ADMIN_EMAIL,null),
                Admin_Mobile:req.param(process.env.ADMIN_MOBILE,null),
                Admin_Address:req.param(process.env.ADMIN_ADDRESS,null),
                Admin_Password:req.param(process.env.ADMIN_PASSWORD,null),
                countryName:mycountryName,
                stateName:req.param(process.env.STATENAME,null),
                cityName:req.param(process.env.CITYNAME,null),
            };
            var abb = await myModel.insertCountryData(CountryData);
            console.log(abb);
            
            var sss= await  myModel.insertStateData(StateData);
            console.log(sss);
            
            var ccc= await myModel.insertCityData(CityData);
            console.log(ccc);
            
            var dd = await myModel.insertAdminData(userData);
            console.log(dd)
            
            res.send("inserted...");  
        }
   
}
exports.UpdateRecords = async(req,res)=>{

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    dateTime = date+' '+time;
    var countryName = req.query.countryName;

    var countryISO3Code = country.ISOcodes(countryName, 'name');
    var countryCurrencyCode = country.currencies(countryName, 'name');
    var countryDialCode =country.callingCodes(countryName, 'name');
    var updateData = {
    
    countryName : countryName,
    stateName : req.query.stateName,
    cityName : req.query.cityName,
    Admin_ID:(req.query.Admin_ID),
    Admin_Status : req.query.Admin_Status,
    Admin_Type : req.query.Admin_Type,
    countryISO3Code:countryISO3Code.alpha3,
    countryISO2Code:countryISO3Code.alpha2,
    countryCurrencyCode:countryCurrencyCode,
    countryDialCode:countryDialCode,
    cityStatus:process.env.ACTIVE,
    cityCreatedDate:dateTime,
    stateStatus:process.env.ACTIVE,
    stateCreatedDate:dateTime,
    countryStatus:process.env.ACTIVE,
    countryCreatedDate:dateTime
    }
   
   myModel.updateData(updateData);
    res.send("updated");
}

exports.DeleteRecord = (req,res)=>{
    Admin_ID =req.param(process.env.ADMIN_ID,null);
    Key = req.param(process.env.KEY,null) ;
    if(Key == "")
    {
        myModel.DeleteRecordOne(Admin_ID);
    }
    else
    {
        myModel.DeleteRecordOne(Key);
    }
    
    res.send("Deleted Record");
}