$(document).ready(function(){
    var $FNameLNameRegEx = /^([a-zA-Z]{2,20})$/;
    var $PasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;
    var $ConNoRegEx = /^([0-9]{10})$/;

    var TxtFNameFlag = false,  TxtEmailIdFlag = false, TxtContactNoFlag = false, TxtPasswordFlag = false;
    
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace.
    specialKeys.push(9); //Tab.
    specialKeys.push(46); //Delete.
    specialKeys.push(16); //Shift.
    specialKeys.push(20); //Caps Lock.
    specialKeys.push(37); //Right Arrow.
    specialKeys.push(39); //Left Arrow.

    $("#TxtFName").bind("keypress", function (e) {
        
        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || specialKeys.indexOf(keyCode) != -1);
        $("#TxtFNameValidate").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });
    $("#TxtContactNo").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode
        var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
        $("#TxtContactNoValidate").html(ret ? "" : "(*) Invalid Input..!!");
        return ret;
    });
    //Blur Validations.
    $("#TxtFName").blur(function(){
        $("#TxtFNameValidate").empty();
        if ($("#TxtFName").val() == "") {
            TxtFNameFlag = false;
            $("#TxtFNameValidate").html('(*) First Name Required..!!');
        }
        else {
            if (!$("#TxtFName").val().match($FNameLNameRegEx)) {
                $("#TxtFNameValidate").html('Invalid First Name..!!');
                TxtFNameFlag = false;
            }
            else {
                TxtFNameFlag = true;
            }
        }
    });
    $("#TxtEmailId").blur(function(){
        $("#TxtEmailIdValidate").empty();
        if ($("#TxtEmailId").val() == "") {
            TxtEmailIdFlag = false;
            $("#TxtEmailIdValidate").html('(*) Email Id Required..!!');
        }
        else {
            if (!$("#TxtEmailId").val().match($EmailIdRegEx)) {
                TxtEmailIdFlag = false;
                $("#TxtEmailIdValidate").html('Invalid Email Id..!!');
            }
            else {
                TxtEmailIdFlag = true;
            }
        }
    });
    $("#TxtContactNo").blur(function(){
        $("#TxtContactNoValidate").empty();
        if ($("#TxtContactNo").val() == '') {
            TxtContactNoFlag = false;
            $("#TxtContactNoValidate").html('(*) Contact No Required..!!');
        }
        else {
            if (!$("#TxtContactNo").val().match($ConNoRegEx)) {
                TxtContactNoFlag = false;
                $("#TxtContactNoValidate").html('Invalid Contact No..!!');
            }
            else {
                TxtContactNoFlag = true;
            }
        }
    });
    $("#TxtPassword").blur(function(){
        $("#TxtPasswordValidate").empty();
        if ($("#TxtPassword").val() == "") {
            $("#TxtPasswordValidate").html("(*) Password Required..!!");
            TxtPasswordFlag = false;
        }
        else {
            if (!$("#TxtPassword").val().match($PasswordRegEx)) {
                TxtPasswordFlag = false;
                $("#TxtPasswordValidate").html('-- Invalid Password..!!<br/><ul style="padding:20px;"><li> Minimum 8 Maximum 12 Character Required.</li><li> Atleast One Uppercase Required.</li><li> Atleast One Lowercase Required.</li><li> Atleast One Numeric Required.</li><li> NO SPECIAL CHARACTERS ALLOWED.</li></ul>');
            }
            else {
                TxtPasswordFlag = true;
            }
        }
    });

    $("#BtnCreateNewAccount").click(function () {
        if ($("#TxtFName").val() == "") {
            TxtFNameFlag = false;
            $("#TxtFNameValidate").html('(*) First Name Required..!!');
        }
        else {
            if (!$("#TxtFName").val().match($FNameLNameRegEx)) {
                $("#TxtFNameValidate").html('Invalid First Name..!!');
                TxtFNameFlag = false;
            }
            else {
                TxtFNameFlag = true;
            }
        }
        if ($("#TxtEmailId").val() == "") {
            TxtEmailIdFlag = false;
            $("#TxtEmailIdValidate").html('(*) Email Id Required..!!');
        }
        else {
            if (!$("#TxtEmailId").val().match($EmailIdRegEx)) {
                TxtEmailIdFlag = false;
                $("#TxtEmailIdValidate").html('Invalid Email Id..!!');
            }
            else {
                TxtEmailIdFlag = true;
            }
        }
        if ($("#TxtContactNo").val() == '') {
            TxtContactNoFlag = false;
            $("#TxtContactNoValidate").html('(*) Contact No Required..!!');
        }
        else {
            if (!$("#TxtContactNo").val().match($ConNoRegEx)) {
                TxtContactNoFlag = false;
                $("#TxtContactNoValidate").html('Invalid Contact No..!!');
            }
            else {
                TxtContactNoFlag = true;
            }
        }
        if ($("#TxtPassword").val() == "") {
            $("#TxtPasswordValidate").html("(*) Password Required..!!");
            TxtPasswordFlag = false;
        }
        else {
            if (!$("#TxtPassword").val().match($PasswordRegEx)) {
                TxtPasswordFlag = false;
                $("#TxtPasswordValidate").html('-- Invalid Password..!!<br/><ul style="padding:20px;"><li> Minimum 8 Maximum 12 Character Required.</li><li> Atleast One Uppercase Required.</li><li> Atleast One Lowercase Required.</li><li> Atleast One Numeric Required.</li><li> NO SPECIAL CHARACTERS ALLOWED.</li></ul>');
            }
            else {
                TxtPasswordFlag = true;
            }
        }

        if(TxtFNameFlag == true && TxtEmailIdFlag == true &&  TxtContactNoFlag == true    && TxtPasswordFlag == true  && $("#countryId").val() != "" && $("#stateId").val() !="" && $("#stateId").val() !="")
        {
            SignUpData($("#TxtFName").val().trim(),$("#TxtEmailId").val().trim(),$("#TxtContactNo").val().trim(),$("#TxtAddress").val().trim(),$("#countryId").val().trim(),$("#stateId").val().trim(),$("#cityId").val().trim(),$("#TxtPassword").val().trim())
        }
        else
        {
            alert("sorry");
        }
    });
});
function SignUpData(TxtFName,TxtEmailId,TxtContactNo,TxtAddress,TxtCountry,TxtState,TxtCity,TxtPassword)
{
    $.ajax({
        url:'Insert_Api',
        type:'Post',
        data:{TxtFName:TxtFName,TxtEmailId:TxtEmailId,TxtContactNo:TxtContactNo,TxtAddress:TxtAddress,TxtCountry:TxtCountry,TxtState:TxtState,TxtCity:TxtCity,TxtPassword:TxtPassword},
        cached:false,
        success:function(data)
        {
            if(data == "This EmailId is Registered....")
            {
                alert("This EmailId is Registered....");
                $("#TxtEmailId").val("");
            }
            else
            {
                alert("inserted...")
                ClearData();
            }
           
        },
        failure:function(data)
        {
            alert("invalid..")
        }
    });
}
const ClearData = ()=>{
    $("#TxtFName").val("");
    $("#TxtEmailId").val("");
    $("#TxtContactNo").val("");
    $("#countryId").val("");
    $("#stateId").val("");
    $("#cityId").val("");
    $("#TxtPassword").val("")
}