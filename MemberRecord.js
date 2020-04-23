
$(document).ready(function(){
    FETCHALLRECORDS("SELECTALLASPERFIRSTNAME","");
    $(document).on("click",".DeleteRecord",function(){
        alert($(this).attr('data-UserDeleteId'));
        DeleteOne("",$(this).attr('data-UserDeleteId'));
    });
    $("#ALLDELETE").click(function(){
        DeleteOne("DeleteAllRecords","");
    });
    $("#SORTBYCOUNTRY").click(function(){
        FETCHALLRECORDS("SELECTALLASPERCOUNTRY","");
    });
    $("#SORTBYSTATE").click(function(){
        FETCHALLRECORDS("SELECTALLASPERSTATE","");
    });
    $("#SORTBYCITY").click(function(){
        FETCHALLRECORDS("SELECTALLASPERCITY","");
    });
    $(document).on("click",".EditRecordCLS",function(){
        x=$(this).attr("data-UserIdEdit");
       $("#btnupdate").click(function(){
           
           if($("#countryId").val() != "" && $("#stateId").val() !="" && $("#stateId").val() !="" )
            {
                
                UpdateRecord(x,$("#countryId").val(),$("#stateId").val(),$("#cityId").val(),$('#Status').find(":selected").text(),$('#AdminType').find(":selected").text());
    
            }
       });
        
        
       
    });
    $("#DDL_pagecounter").change(function(){
        
        FETCHALLRECORDS("SELECTALLASPERFIRSTNAME","");
    });
    var $FNameLNameRegEx = /^([a-zA-Z]{2,20})$/;
    
 
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace.
    specialKeys.push(9); //Tab.
    specialKeys.push(46); //Delete.
    specialKeys.push(16); //Shift.
    specialKeys.push(20); //Caps Lock.
    specialKeys.push(37); //Right Arrow.
    specialKeys.push(39); //Left Arrow.
    $("#SCOUNTRYBTN").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || specialKeys.indexOf(keyCode) != -1);
        $("#SCOUNTRYVALIDATEBTN").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });
    $("#SSTATEBTN").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || specialKeys.indexOf(keyCode) != -1);
        $("#SSTATEVALIDATEBTN").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });
    $("#SCITYBTN").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || specialKeys.indexOf(keyCode) != -1);
        $("#SCITYVALIDATEBTN").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });
    
    $("#SEARCHBYALL").click(function(){
        
        var textbox = [];
        textbox.push($("#SCOUNTRYBTN").val());
        textbox.push($("#SSTATEBTN").val());
        textbox.push($("#SCITYBTN").val());
        FETCHALLRECORDS('SELECTALLASPERBTN',textbox);
    });
});
function FETCHALLRECORDS(FindOps,KeypressByUser)
{
    $.ajax({

        url:'/Fetch_Api_one',
        type:'get',
        data:{FindOps:FindOps,KeypressByUser:KeypressByUser},
        cache:false,
        dataType:'JSON',
        success: (data)=>{
            var UserArr =data;
               $("#tablebody").empty();
                if(UserArr.length>0)
                {   
                    for(var i=0;i<UserArr.length;i++)
                    {
                            var j=i+1;
                            var StatusIcon=null;

                            if(UserArr[i].Admin_Status=='Active')
                            {
                                StatusIcon="<i style='color:#228B22'>Active</i>";
                            }  
                            else
                            {
                                StatusIcon="<i style='color:#ff0000'>InActive</i>";
                            }
                            var Delete = "<i class='fa fa-trash' style='color:red; font-size:25px;'></i>";
                            var DataRowId = parseInt(i/parseInt($("#DDL_pagecounter").val())) + 1;
                            
                            $("#tablebody").append(
                                
                                "<tr data-row-id='" + DataRowId + "'>"
                                    +"<td>"+j+"</td>"
                                    +"<td>"+UserArr[i].Admin_ID+"</td>"
                                    +"<td>"+UserArr[i].Admin_Name+"</td>"
                                    +"<td>"+UserArr[i].Admin_Email+"</td>"
                                    +"<td>"+UserArr[i].Admin_Mobile+"</td>"
                                    +"<td>"+UserArr[i].countryName+"</td>"
                                    +"<td>"+UserArr[i].stateName+"</td>"
                                    +"<td>"+UserArr[i].cityName+"</td>"
                                    +"<td>"+StatusIcon+"</td>"
                                    +"<td><a data-toggle='modal' data-target='#EditUserRecord' class='EditRecordCLS' data-UserIdEdit='"+UserArr[i].Admin_ID+"'><i class='fa fa-2x fa-edit'></i></a></td>"
                                    +"<td><a  class='DeleteRecord' data-UserDeleteId='"+UserArr[i].Admin_ID+"'>"+Delete+"</a></td>"
                            +"</tr>"    
                            );
                                $("#tablebody tr").css("display","none");
                                $("[data-row-id=1]").css("display","table-row");
                                var maxcounter = parseInt(UserArr.length /parseInt($("#DDL_pagecounter").val()) );
                                var maxcountermode = parseInt(UserArr.length % parseInt($("#DDL_pagecounter").val()) );
                                
                                if((UserArr.length < $("#DDL_pagecounter").val()  || maxcountermode==0 )&&(maxcounter<=1))
                                {
                                    
                                    $("#managepager").css("display","none");
                                }
                                else
                                {

                                    $("#managepager").css("display","block");
                                    $("#managepager").empty();
                                    $("#managepager").append("<li class='page-item' data-indexid = '-1'><a class='page-link'><i class = 'fa fa-angle-double-left'></i>Previous</a></li><li class='page-item active' data-indexid = '1'><a class='page-link'>1</a></li>");

                                    if(maxcountermode>0)
                                    {
                                        maxcounter++;
                                    }

                                    if(maxcounter > 1 && i == parseInt(UserArr.length-1))
                                    {
                                        var finalcounter;
                                        for(var c =0;c<maxcounter-1;c++)
                                        {
                                            finalcounter = parseInt(c+2);
                                            $("#managepager").append("<li class='page-item' data-indexid = '"+ finalcounter +"'><a class='page-link'>"+finalcounter+"</a></li>");

                                        }
                                    }
                                } 
                        }
                        $("#managepager").append("<li class='page-item' data-indexid = '0'><a class='page-link'><i class = 'fa fa-angle-double-right'></i>Next</a></li>");
                }
                else
                {
                    $("#tablebody").append(
                        "<tr>"
                                +"<td colspan='11' class='text-center text-danger'>----------------------------NO RECORDS FOUND------------------------------</td>"
                        +"</tr>"
                    );
                }
                
        },
        failure: (err)=>{
            alert(err);
        }
    });
}

function UpdateRecord(Admin_ID,countryName,stateName,cityName,Admin_Status,Admin_Type)
{   
    
    $.ajax({
        url:'/UpdateRecord_Api',
        type:'post',
        data:{Admin_ID:Admin_ID,countryName:countryName,stateName:stateName,cityName:cityName,Admin_Status:Admin_Status,Admin_Type:Admin_Type},
        cache:false,
        success:function(data){
            alert(data);
            FETCHALLRECORDS("SELECTALLASPERFIRSTNAME","");
            $("#EditUserRecord .close").click();
        },
        failure:function(){

        }
    });
}

function DeleteOne(Key,Admin_ID)
{
    $.ajax({
        url:'/DeleteRecord_Api',
        type:'post',
        data:{Key:Key,Admin_ID:Admin_ID},
        cache:false,
        success:function(data){
            alert(data);
            FETCHALLRECORDS("SELECTALLASPERFIRSTNAME","");
        },
        failure:function(){

        }
    });
}
