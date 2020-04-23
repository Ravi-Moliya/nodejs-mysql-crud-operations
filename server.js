const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(session({secret: 'Secret',saveUninitialized: true,resave: true}));
app.use(cookieParser());

var router = require('./router');
app.listen(3000,()=>{console.log("listten on port 3000");});
app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(__dirname + '/js'));

app.use('/',router);