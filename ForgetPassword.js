$(document).ready(function(){
    
    var $PasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
    var $EmailIdRegEx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{2,10})(\]?)$/;
    var TxtUserNameFlag = false,TxtPasswordFlag = false;
    
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace.
    specialKeys.push(9); //Tab.
    specialKeys.push(46); //Delete.
    specialKeys.push(16); //Shift.
    specialKeys.push(20); //Caps Lock.
    specialKeys.push(37); //Right Arrow.
    specialKeys.push(39); //Left Arrow.
    $("#TxtUserName").blur(function(){
        $("#TxtUserNameValidate").empty();
        if ($("#TxtUserName").val() == "") {
            TxtUserNameFlag = false;
            $("#TxtUserNameValidate").html('(*) UserName Required..!!');
        }
        else {
            if (!$("#TxtUserName").val().match($EmailIdRegEx)) {
                $("#TxtUserNameValidate").html('Invalid UserName..!!');
                TxtUserNameFlag = false;
            }
            else {
                TxtUserNameFlag = true;    
            }
        }
    });
    $("#BtnUserID").click(function () {
        if ($("#TxtUserName").val() == "") {
            TxtUserNameFlag = false;
            $("#TxtUserNameValidate").html('(*) UserName Required..!!');
        }
        else {
            if (!$("#TxtUserName").val().match($EmailIdRegEx)) {
                $("#TxtUserNameValidate").html('Invalid UserName..!!');
                TxtUserNameFlag = false;
            }
            else {
                TxtUserNameFlag = true;
                
            }
        }

        if(TxtUserNameFlag == true)
        {
           var  to=$("#TxtUserName").val();
           var subject='Reset Password';
           userD(to,subject);
        }
    });  
});

const userD = (to,subject)=>{
    
    $.ajax({
        url:'send',
        type:'get',
        cached:false,
        data:{to:to,subject:subject},
        success:(data)=>{
           console.log(data);
           alert("Furthur Instruction send in Email");
        },
        failure:(err)=>{
            console.log(err);
        }
    });
}