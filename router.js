const express = require('express');
const router = express.Router();

const controller = require('./controllers/MyController');

    router.get('/',controller.renderLoginPage);
    router.get('/SignUp',controller.renderSignUpPage);
    router.get('/MemberRecord',controller.renderMemberRecordPage);
    router.get('/ForgetPassword',controller.renderForgetPasswordPage);
    router.get('/ConfirmPassword',controller.renderConfirmPasswordPage);
    router.get('/UserProfile',controller.renderUserProfilePage);
    
    router.post('/Login_Api',controller.Authonticate);
    router.post('/Insert_Api',controller.InsertRecord);
    
    router.get('/Fetch_Api_one',controller.FetchRecord);
    router.post('/UpdateRecord_Api',controller.UpdateRecords);
  
    router.get('/send',controller.send);
    router.post('/UpdatePassword',controller.UpdatePassword);

    router.post('/DeleteRecord_Api',controller.DeleteRecord);

module.exports = router;