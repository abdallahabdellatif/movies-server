var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var session = require('express-session');

app.use(session({
	secret: 'secret',
	resave: true,
  saveUninitialized: true
})
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// START HERE // 
app.get('/register', function(req, res) {
  res.render('registration',{msg:''});
});

app.post('/register',function(req,res){
  // console.log('Registeration Attempt');
  var tryinguser = req.body.username;
  var tryingpass = req.body.password;
  // console.log("input username: "+tryinguser);
  // console.log("input pass: "+tryingpass);
  if (tryinguser==""){
    // console.log('empty username!');
    // res.render('registeration',{msg:'eu'});
    res.render('registration',{msg:'eu'});
  }
  else if (tryingpass==""){
    // console.log('empty password!');
    // res.render('registeration',{msg:'ep'});
    res.render('registration',{msg:'ep'});
  }
  else{
    var database = JSON.parse(fs.readFileSync("Users/users_ass.json"));
    var i;
    var flag = true;
    for (i=0;i<database.length;i++){
      var curuser = database[i];
      // console.log(curuser+" "+tryinguser);
      if (curuser.username.toLowerCase()==tryinguser.toLowerCase()){
        flag = false;
        break;
      }
    }
    if (!flag){         // AN ERROR should be shown to the user
      // console.log('Username already taken!');
      res.render('registration',{msg:'tk'});
    }
    else{
        var newUser = {
          username : tryinguser,
          password : tryingpass
        };
        database.push(newUser);
        fs.writeFileSync('Users/users_ass.json',JSON.stringify(database));
        // console.log('Successful Registeration');
        res.render('registration',{msg:'sr'});
    }
  } 
});


app.get('/', function(req, res) {
  res.render('login',{msg:''});
});

app.post('/',function(req,res){
  // console.log('Login Atteempt');
  var tryinguser = req.body.username;
  var tryingpass = req.body.password;
  // console.log("input username: "+tryinguser);
  // console.log("input pass: "+tryingpass);
  if (tryinguser==""){
    // console.log('empty username!');
    res.render('login',{msg:'eu'});
  }
  else if (tryingpass==""){
    // console.log('empty password!');
    res.render('login',{msg:'ep'});
  }
  else{

    var database = JSON.parse(fs.readFileSync("Users/users_ass.json"));
    var i;
    var flag = false;  
    for (i=0;i<database.length;i++){
      var curuser = database[i];
      if (curuser.username.toLowerCase()==tryinguser.toLowerCase()){
        flag = true;
        if (curuser.password==tryingpass){
          // console.log('success login');
          req.session.loggedin = true;
          req.session.username=tryinguser;
          res.redirect('/home');
        }
        else{
          // console.log('password not match');
          // res.redirect('/login_wrongPass');
          res.render('login',{msg:'wp'});
        }
        
      }
    }
    if (!flag){ // Here an error message should be thrown to the user ;
      // console.log('Error; this username is not registered');
      res.render('login',{msg:'nu'});
    }
  } 
  
})

app.get('/home', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('home');
  }
});




// app.get('/err',function(req,res){
//   res.render('notallowed');
// })

/*
app.get('/action', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('action');
  }
});

app.get('/conjuring', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('conjuring');
  }
});

app.get('/darkknight', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{ 
    res.render('darkknight');
  }
});

app.get('/drama', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('drama');
  }
});

app.get('/fightclub', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('fightclub');
  }
});

app.get('/godfather', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('godfather');
  }
});

app.get('/godfather2', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('godfather2');
  }
});

app.get('/horror', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('horror');
  }
});


app.get('/scream', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('scream');
  }
});

app.get('/searchresults', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('searchresults');
  }
});

app.get('/watchlist', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('watchlist');
  }
}); 


*/

app.get('*',function(req,res){
  res.send('404 NOT FOUND');
});
var port_num = process.env.PORT || 3000;
app.listen(port_num);

// END HERE //

module.exports = app;