$(document).ready(function(){
    
    var $PasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;
    var TxtConfirmPasswordFlag = false,TxtPasswordFlag = false;
    
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace.
    specialKeys.push(9); //Tab.
    specialKeys.push(46); //Delete.
    specialKeys.push(16); //Shift.
    specialKeys.push(20); //Caps Lock.
    specialKeys.push(37); //Right Arrow.
    specialKeys.push(39); //Left Arrow.
    
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
    $("#TxtConfirmPassword").blur(function(){
        $("#TxtConfirmPasswordValidate").empty();
        if ($("#TxtConfirmPassword").val() == "") {
            $("#TxtConfirmPasswordValidate").html("(*) Password Required..!!");
            TxtConfirmPasswordFlag = false;
        }
        else {
            if (!$("#TxtConfirmPassword").val().match($PasswordRegEx)) {
                TxtConfirmPasswordFlag = false;
                $("#TxtConfirmPasswordValidate").html('-- Invalid Password..!!<br/><ul style="padding:20px;"><li> Minimum 8 Maximum 12 Character Required.</li><li> Atleast One Uppercase Required.</li><li> Atleast One Lowercase Required.</li><li> Atleast One Numeric Required.</li><li> NO SPECIAL CHARACTERS ALLOWED.</li></ul>');
            }
            else {
                if($("#TxtConfirmPassword").val() == $("#TxtPassword").val() )
                {
                    TxtConfirmPasswordFlag = true;
                }
                else
                {
                    $("#TxtConfirmPasswordValidate").html("(*) Password must be same..!!");
                } 
            }
        }
    });

    $("#BtnPasswordConfirm").click(function () {
        
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
        if ($("#TxtConfirmPassword").val() == "") {
            $("#TxtConfirmPasswordValidate").html("(*) Password Required..!!");
            TxtConfirmPasswordFlag = false;
        }
        else {
            if (!$("#TxtConfirmPassword").val().match($PasswordRegEx)) {
                TxtConfirmPasswordFlag = false;
                $("#TxtConfirmPasswordValidate").html('-- Invalid Password..!!<br/><ul style="padding:20px;"><li> Minimum 8 Maximum 12 Character Required.</li><li> Atleast One Uppercase Required.</li><li> Atleast One Lowercase Required.</li><li> Atleast One Numeric Required.</li><li> NO SPECIAL CHARACTERS ALLOWED.</li></ul>');
            }
            else {
                if($("#TxtConfirmPassword").val() == $("#TxtPassword").val() )
                {
                    TxtConfirmPasswordFlag = true;
                }
                else
                {
                    $("#TxtConfirmPasswordValidate").html("(*) Password must be same..!!");
                } 
            }
        }
        if(TxtPasswordFlag == true && TxtConfirmPasswordFlag== true)
        {
            
            ResetPassword($("#TxtPassword").val());
        }
        else
        {
            alert("incorrect.....");
        }
    });
});

const  ResetPassword = (TxtPassword)=>{
    
    $.ajax({
        url:'UpdatePassword',
        type:'post',
        cached:false,
        data:{TxtPassword:TxtPassword},
        success:(data)=>{
           alert(data);
        },
        failure:(err)=>{
            alert(err);
        }
    });
}