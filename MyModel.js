var db = require('../config/database.js');

var myModel = ()=>{};                    

myModel.checkEmail = (Admin_Email) => new Promise((resolve,reject)=>{
    db.query('SELECT Admin_ID FROM admin WHERE Admin_Email="'+Admin_Email +'"',(err,result,field)=>{
        if(err) throw err;
        if(result.length > 0)
        {   
            resolve(process.env.EMAILREGISTERED);
        }
        resolve("okk");
    });
});
myModel.updateLastLogin =(Admin_Email,dateTime)=>{
    console.log(Admin_Email);
    var sql = "UPDATE admin  SET Admin_Last_Login='"+dateTime +"' WHERE Admin_Email = '"+Admin_Email+"'";
     db.query(sql,function (err, result) {
        if (err) throw err;

    });
}
myModel.FetchData = ()=> new Promise((resolve,reject)=>{

    db.query(`SELECT \`admin\`.\`Admin_ID\`, \`admin\`.\`Admin_Name\`, \`admin\`.\`Admin_Email\`, \`admin\`.\`Admin_Mobile\`, \`admin\`.\`Admin_Status\`, \`country\`.\`countryName\`, \`state\`.\`stateName\`, \`city\`.\`cityName\`FROM \`admin\` LEFT JOIN \`country\` ON \`admin\`.\`countryID\` = \`country\`.\`countryID\`LEFT JOIN \`state\` ON \`admin\`.\`stateID\` = \`state\`.\`stateID\`LEFT JOIN \`city\` ON \`admin\`.\`cityID\` = \`city\`.\`cityID\` `,(err,result,field)=>{
        if(err)
        {
            reject(err)
        }
        resolve(result);
    });
});

myModel.FetchSearchData = (searchData)=> new Promise((resolve,reject)=>{
    var countryName = searchData.countryName;
    var stateName = searchData.stateName;
    var cityName = searchData.cityName;
    if( countryName == '' && stateName == '' && cityName=='')
    {
        
        var newLocal = "SELECT admin.Admin_ID ,admin.Admin_Name,admin.Admin_Email,admin.Admin_Mobile,admin.Admin_Status,country.countryName,state.stateName,city.cityName from admin LEFT JOIN country ON admin.countryID=country.countryID LEFT JOIN state ON admin.stateID = state.stateID LEFT JOIN city ON admin.cityID = city.cityID";
   
    }
    else
    {
        var newLocal = "SELECT admin.Admin_ID ,admin.Admin_Name,admin.Admin_Email,admin.Admin_Mobile,admin.Admin_Status,country.countryName,state.stateName,city.cityName from admin LEFT JOIN country ON admin.countryID=country.countryID LEFT JOIN state ON admin.stateID = state.stateID LEFT JOIN city ON admin.cityID = city.cityID WHERE (country.countryName = '"+countryName+"'OR state.stateName='"+stateName +"' OR city.cityName='"+cityName+"' )";
    }
      db.query(newLocal,(err,result,field)=>{
    
        if(err)
        {
            reject(err);
        }
       
        resolve(result);
    });
});
myModel.FetchSortData = (sortData)=> new Promise((resolve,reject)=>{
    var order = sortData;
    const newLocal = `SELECT admin.Admin_ID ,admin.Admin_Name,admin.Admin_Email,admin.Admin_Mobile,admin.Admin_Status,country.countryName,state.stateName,city.cityName from admin LEFT JOIN country ON admin.countryID=country.countryID LEFT JOIN state ON admin.stateID = state.stateID LEFT JOIN city ON admin.cityID = city.cityID ORDER BY ${order} `;
    db.query(newLocal,(err,result,field)=>{
    
        if(err)
        {
            reject(err);
        }
        resolve(result);
    });
});
myModel.updatePassword = (userData,result)=>{
    
    var user = userData[0] , Password=userData[1];

    var sql = "UPDATE admin SET Admin_Password='"+Password+"' WHERE Admin_Email='"+user+"'"

    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
}
myModel.insertCountryData = (countryData,result)=>new Promise((resolve,reject)=>{
    rowcountry="";
    
    var countryName = countryData.countryName;
    var countrysql = "SELECT countryID FROM country WHERE countryName = '"+countryName+"'";
    db.query(countrysql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        if(result.length == 0)
        {
            db.query('INSERT into country SET ? ',countryData,(err,res,field)=>{
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    resolve("okkkkk");
                }    
            });
        } 
        resolve("reject country");       
    });
           
});
myModel.insertStateData = (stateData,result)=>new Promise((resolve,reject)=>{
    rowstate="";
    var countryName = stateData.countryName;
    var stateName = stateData.stateName;
    var stateStatus= stateData.stateStatus;
    var stateCreatedDate=stateData.stateCreatedDate;
    var statesql = 'SELECT stateID FROM state WHERE stateName = "'+stateName+'" ';
    db.query(statesql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        if(result.length == 0)
        {
            db.query('INSERT into state SET stateName = "'+stateName+'",stateStatus="'+stateStatus+'",stateCreatedDate="'+stateCreatedDate+'",countryID=(SELECT countryID FROM country where countryName ="'+countryName+'")',(err,res,field)=>{
                if(err)
                {
                    console.log(err);
                    
                }
                else
                {
                    console.log("inserted.. state...");
                    resolve("okkkkk");
                }    
            });
        }           
        resolve("reject state");  
    });
           
});
myModel.insertCityData = (cityData,result)=>new Promise((resolve,reject)=>{
    rowcity="";
    var countryName = cityData.countryName;
    var stateName = cityData.stateName;
    var cityName = cityData.cityName;
    var cityStatus=cityData.cityStatus;
    var cityCreatedDate=cityData.cityCreatedDate
    var citysql = "SELECT cityID FROM city WHERE cityName = '"+cityName+"'";
    countryidrow="";
    stateidrow="";
    
    db.query(citysql,(err,result)=>{
        if(err)
        {
            throw err;
        }
        if(result.length == 0)
        {
            
            let sql = 'INSERT into city SET countryID = (SELECT countryID FROM country WHERE countryName="'+countryName+'"), stateID = (SELECT stateID FROM state WHERE stateName="'+stateName+'"), cityName = "'+cityName+'", cityStatus = "'+cityStatus+'", cityCreatedDate="'+cityCreatedDate+'"' 
            console.log(sql);
            db.query(sql,(err,res,field)=>{
                if(err)
                { 
                    console.log(err);
                    
                }
                else
                {
                    resolve("okkkkk");
                }    
            });
            
        }
        else
        {
          resolve("reject city");
        }
    });
});

myModel.insertAdminData = (userData,result)=>new Promise((resolve,reject)=>{

    
    var country = userData.countryName;
    var state = userData.stateName;
    var city = userData.cityName;
    const saltRounds = 10;
    bcrypt.hash(userData.Admin_Password, saltRounds).then(function(hash) {         
             
    var Admin_Email = userData.Admin_Email;
    var Admin_Name = userData.Admin_Name;
    var Admin_Mobile = userData.Admin_Mobile;
    var Admin_Address = userData.Admin_Address;
    var Admin_Password = hash;

    var sql = 'INSERT into admin SET Admin_Name = "'+Admin_Name+'", Admin_Email = "'+Admin_Email+'", Admin_Mobile = "'+Admin_Mobile+'", Admin_Address="'+ Admin_Address+'",Admin_Password = "'+Admin_Password+'", countryID = (SELECT countryID FROM country WHERE (countryName = "'+country+'")), stateID = (SELECT stateID FROM state WHERE (stateName = "'+state+'")), cityID = (SELECT cityID FROM city WHERE (cityName = "'+city+'")) '
    console.log(sql);
    db.query(sql,(err,res,field)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            resolve("okkkkk");
        }    
    });
    });
            
});

myModel.updateData = async(updateData ,result) => {
    
    var countryName = updateData.countryName;
    var stateName = updateData.stateName;
    var cityName = updateData.cityName;
    var Admin_ID = updateData.Admin_ID;
    countryISO3Code=updateData.countryISO3Code;
    countryISO2Code=updateData.countryISO2Code;
    countryCurrencyCode=updateData.countryCurrencyCode;
    countryDialCode=updateData.countryDialCode;
    Admin_Status = updateData.Admin_Status;
    Admin_Type = updateData.Admin_Type;
    cityStatus=updateData.cityStatus,
    cityCreatedDate=updateData.cityCreatedDate,
    stateStatus=updateData.stateStatus,
    stateCreatedDate=updateData.stateCreatedDate,
    countryStatus=updateData.countryStatus,
    countryCreatedDate=updateData.countryCreatedDate
    console.log("up");
    
    var countryssql = "SELECT countryID FROM country WHERE countryName = '"+countryName+"'";
    crow = "";
    caidrow = "";
    db.query(countryssql,(err,result,field)=>{
        if(err) throw err;
        Object.keys(result).forEach(function(key) {
                crow = result[key];
            });
        if(result.length > 0)
        {
            var statessql = "SELECT stateID FROM state WHERE stateName = '"+stateName+"'";
            srow = "";
            saidrow = "";
            db.query(statessql,(err,result,field)=>{
                if(err) throw err;
                Object.keys(result).forEach(function(key) {
                    srow = result[key];
                });
                if(result.length > 0)
                {   
                    var countryssql = "SELECT cityID FROM city WHERE cityName = '"+cityName+"'";
                    cityrow = "";
                    cityidrow = "";
                    db.query(countryssql,(err,result,field)=>{
                        if(err) throw err;
                        Object.keys(result).forEach(function(key) {
                            cityrow = result[key];
                        });
                        if(result.length > 0)
                        {
                            console.log("same");
                            var upsql ="UPDATE admin LEFT JOIN country ON admin.countryID=country.countryID LEFT JOIN state ON admin.stateID = state.stateID LEFT JOIN city ON admin.cityID = city.cityID SET admin.countryID='"+crow.countryID+"',admin.stateID='"+srow.stateID +"',admin.cityID='"+cityrow.cityID +"',admin.Admin_Status='"+Admin_Status+"',admin.Admin_Type='"+Admin_Type+"' WHERE  admin.Admin_ID='"+Admin_ID+"'  ";                     
                            db.query(upsql,function (err, result) {
                                if (err) throw err;
            
                            });
                        }
                        else
                        {
                            let sql = 'INSERT into city SET countryID = (SELECT countryID FROM country WHERE countryName="'+countryName+'"), stateID = (SELECT stateID FROM state WHERE stateName="'+stateName+'"), cityName = "'+cityName+'", cityStatus = "'+cityStatus+'", cityCreatedDate="'+cityCreatedDate+'"' 
                            db.query(sql,(err,res,field)=>{
                                if(err)
                                {
                                    console.log(err);
                                
                                }
                                else
                                {
                                    
                                    //resolve("okkkkk");
                                }    
                            });
                            var upsql ="UPDATE admin LEFT JOIN country ON admin.countryID=country.countryID LEFT JOIN state ON admin.stateID = state.stateID LEFT JOIN city ON admin.cityID = city.cityID SET admin.countryID='"+crow.countryID+"',admin.stateID='"+srow.stateID +"',admin.cityID= (SELECT cityID FROM city WHERE cityName='"+cityName+"'),admin.Admin_Status='"+Admin_Status+"',admin.Admin_Type='"+Admin_Type+"' WHERE  admin.Admin_ID='"+Admin_ID+"'  ";                     
                            db.query(upsql,function (err, result) {
                                if (err) throw err;
            
                            });
                        }
                    });
                }
                else
                {
                   
                    db.query('INSERT into state SET stateName = "'+stateName+'",stateStatus="'+stateStatus+'",stateCreatedDate="'+stateCreatedDate+'",countryID=(SELECT countryID FROM country where countryName ="'+countryName+'")',(err,res,field)=>{
                        if(err)
                        {
                            console.log(err);
                            
                        }
                        else
                        {
                            
                            //resolve("okkkkk");
                        }    
                    });
                    let sql = 'INSERT into city SET countryID = (SELECT countryID FROM country WHERE countryName="'+countryName+'"), stateID = (SELECT stateID FROM state WHERE stateName="'+stateName+'"), cityName = "'+cityName+'", cityStatus = "'+cityStatus+'", cityCreatedDate="'+cityCreatedDate+'"' 
                    db.query(sql,(err,res,field)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            
                            //resolve("okkkkk");
                        }    
                    });
                    var upsql ="UPDATE admin LEFT JOIN country ON admin.countryID=country.countryID LEFT JOIN state ON admin.stateID = state.stateID LEFT JOIN city ON admin.cityID = city.cityID SET admin.countryID='"+crow.countryID+"',admin.stateID=(SELECT stateID FROM state WHERE stateName='"+stateName+"'),admin.cityID= (SELECT cityID FROM city WHERE cityName='"+cityName+"'),admin.Admin_Status='"+Admin_Status+"',admin.Admin_Type='"+Admin_Type+"' WHERE  admin.Admin_ID='"+Admin_ID+"'  ";                     
                    
                    db.query(upsql,function (err, result) {
                        if (err) throw err;
    
                    });
                }
            });
        }
        else
        {
            let countrysql = 'INSERT into country SET countryName = "'+countryName+'", countryISO3Code = "'+countryISO3Code+'", countryISO2Code="'+countryISO2Code+'", countryCurrencyCode="'+countryCurrencyCode+'", countryDialCode="'+countryDialCode+'", countryStatus="'+countryStatus+'",countryCreatedDate="'+countryCreatedDate+'"' 
                
            db.query(countrysql,(err,res,field)=>{
                if(err)
                {
                    console.log(err);
                   
                }
                else
                {

                    //resolve("okkkkk");
                }    
                db.query('INSERT into state SET stateName = "'+stateName+'",stateStatus="'+stateStatus+'",stateCreatedDate="'+stateCreatedDate+'",countryID=(SELECT countryID FROM country where countryName ="'+countryName+'")',(err,res,field)=>{
                    if(err)
                    {
                        console.log(err);
                        
                    }
                    else
                    {
                        
                        //resolve("okkkkk");
                    }    
                });
                let sql = 'INSERT into city SET countryID = (SELECT countryID FROM country WHERE countryName="'+countryName+'"), stateID = (SELECT stateID FROM state WHERE stateName="'+stateName+'"), cityName = "'+cityName+'", cityStatus = "'+cityStatus+'", cityCreatedDate="'+cityCreatedDate+'"' 
                db.query(sql,(err,res,field)=>{
                    if(err)
                    {
                        console.log(err);
                    
                    }
                    else
                    {
                        
                        //resolve("okkkkk");
                    }    
                });
                var upsql ="UPDATE admin LEFT JOIN country ON admin.countryID=country.countryID LEFT JOIN state ON admin.stateID = state.stateID LEFT JOIN city ON admin.cityID = city.cityID SET admin.countryID=(SELECT countryID FROM country WHERE countryName='"+countryName+"'),admin.stateID=(SELECT stateID FROM state WHERE stateName='"+stateName+"'),admin.cityID= (SELECT cityID FROM city WHERE cityName='"+cityName+"'),admin.Admin_Status='"+Admin_Status+"',admin.Admin_Type='"+Admin_Type+"' WHERE  admin.Admin_ID='"+Admin_ID+"'  ";                     
                db.query(upsql,function (err, result) {
                    if (err) throw err;

                });
            });
        }
    });
}

myModel.DeleteRecordOne = (data,result)=>{
    
    
    if(data != process.env.DELETEALLRECORDS)
    {
        sql = "DELETE FROM admin WHERE Admin_ID = '"+data+"'";
        db.query(sql,function(err,result){
            if(err) throw err;
        });
    }
    else
    {
        var dsql ="DELETE FROM admin";    

        db.query(dsql,function(err,result){
            if(err) throw err;
        });
        dcitysql ="DELETE FROM city";  
        db.query(dcitysql,function(err,result){
            if(err) throw err;
        });
        dstatesql ="DELETE FROM state";  
        db.query(dstatesql,function(err,result){
            if(err) throw err;
        });
        dcountrysql ="DELETE FROM country";  
        db.query(dcountrysql,function(err,result){
            if(err) throw err;
        });
        
    }
}
module.exports = myModel;