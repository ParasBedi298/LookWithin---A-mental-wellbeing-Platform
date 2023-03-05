const express = require('express');
const app = express();
require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');

// Authorization Part
app.use(
  auth({
    authRequired : false,
    // auth0Logout : true,
    issuerBaseURL:process.env.ISSUER_BASE_URL ,
    baseURL:process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res)=>{
    // res.render(req.oidc.isAuthenticated() ? 'index' : 'index2');
    if (req.oidc.isAuthenticated()){
      res.render('index', {logprompt : "LogOut", logaction : "/logout"})
    }
    else{
      res.render('index', {logprompt : "LogIn", logaction : "/login"})
    }
})

app.get('/resources', (req,res)=>{
  // res.render(req.oidc.isAuthenticated() ? 'index' : 'index2');
  if (req.oidc.isAuthenticated()){
    res.render('resources', {logprompt : "LogOut", logaction : "/logout"})
  }
  else{
    res.render('resources', {logprompt : "LogIn", logaction : "/login"})
  }
})

app.get('/tools', (req,res)=>{
  // res.render(req.oidc.isAuthenticated() ? 'index' : 'index2');
  if (req.oidc.isAuthenticated()){
    res.render('tools', {logprompt : "LogOut", logaction : "/logout"})
  }
  else{
    res.render('tools', {logprompt : "LogIn", logaction : "/login"})
  }
})

app.get('/community', (req,res)=>{
  // res.render(req.oidc.isAuthenticated() ? 'index' : 'index2');
  if (req.oidc.isAuthenticated()){
    res.render('community', {logprompt : "LogOut", logaction : "/logout"})
  }
  else{
    res.render('community', {logprompt : "LogIn", logaction : "/login"})
  }
})


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});