var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var session = require('express-session');

//var loggedinUser;

app.use(session({
	secret: 'secret',
	resave: true,
  saveUninitialized: true,
  loggedinUser: ''
})
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// START HERE // 

function exist(x,arr){
  var i;
  for(i=0;i<arr.length;i++){
    if(arr[i]==x){
      return true;
    }
  }
  return false;
}

// 7ewar el try catch ne3melo 3alshan law el json file fady

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
          password : tryingpass,
          watchlistU :[]
        };
        database.push(newUser);
        fs.writeFileSync('Users/users_ass.json',JSON.stringify(database));
        // console.log('Successful Registeration');
        res.render('registration',{msg:'sr'});
        //khaled -- create new object get json file , add the object , return the object
        // var watchArray=new Array()
        // var newUserWatch={
        //   username : tryinguser,
        //   watchArray :[]
        // }
        // var watchData= JSON.parse(fs.readFileSync("Users/watchlistU.json"));
        // watchData.push(newUserWatch);
        // fs.writeFileSync('Users/watchlistU.json',JSON.stringify(watchData))
    }
  } 

});


app.get('/', function(req, res) {
  if (req.session.loggedin){
    res.redirect('/home'); 
  }
  else{
    res.render('login',{msg:''});
  }
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




app.get('/err',function(req,res){
  res.render('notallowed');
})


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
    res.render('conjuring',{msg:''});
  }
});

app.post('/conjuring',function(req,res){
  if(noOccInWatchlist('conjuring',req)){
  addtowatchlist('conjuring',req);
  res.redirect('watchlist')
  }
  else{
    res.render('conjuring',{msg:'n'});
  }
 // res.end();
 
});

app.get('/darkknight', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{ 
    res.render('darkknight',{msg:''});
  }
});

app.post('/darkknight',function(req,res){
  if(noOccInWatchlist('darkknight',req)){
    addtowatchlist('darkknight',req);
    res.redirect('watchlist')
  }
  else{
    res.render('darkknight',{msg:'n'});
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
    res.render('fightclub',{msg:''});
  }
});

app.post('/fightclub',function(req,res){
  if(noOccInWatchlist('fightclub',req)){
  addtowatchlist('fightclub',req);
  res.redirect('watchlist')
  }
  else{
    res.render('fightclub',{msg:'n'})
  }
});


app.get('/godfather', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('godfather',{msg:''});
  }
});

app.post('/godfather',function(req,res){
  if(noOccInWatchlist('godfather',req)){
  addtowatchlist('godfather',req);
  res.redirect('watchlist')
}
else{
  res.render('godfather',{msg:'n'});
}
  
});


app.get('/godfather2', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('godfather2',{msg:''});
  }
});

app.post('/godfather2',function(req,res){
  if(noOccInWatchlist('godfather2',req)){
  addtowatchlist('godfather2',req);
  res.redirect('watchlist')
  }
  else{
    res.render('godfather2',{msg:'n'});
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
    res.render('scream',{msg:''});
  }
});

app.post('/scream',function(req,res){
  if(noOccInWatchlist('scream',req)){
  addtowatchlist('scream',req);
  res.redirect('watchlist')
  }
  else{
    res.render('scream',{msg:'n'});
  }
});


//app.get('/searchresults', function(req, res) {
  //if (!req.session.loggedin){
   // res.redirect('/');
  //}
  //else{
   // res.render('searchresults');
  //}
//});

app.get('/watchlist', function(req, res) {
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    var watchData= JSON.parse(fs.readFileSync("Users/users_ass.json"));
    var i;
    var x=[];
    for(i=0;i<watchData.length;i++){
      if(watchData[i].username==req.session.username){
          x=watchData[i].watchlistU;
      }
    }
    res.render('watchlist',{movies:x});
    

  }
}); 

app.post('/search',function(req,res){
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    var name=req.body.Search;
    name=name.toLowerCase();
    var y=[];
    var x = ['the godfather (1972)', 'the godfather: part ii (1974)', 
    'the dark knight (2008)', 'fight club (1999)', 'scream (1996)','the conjuring (2013)'];
    var z=['the godfather','the godfather 2','the dark knight','fight club','scream','the conjuring'];
    //console.log(names)
    console.log(name)

    for(var i=0;i<z.length;i++){
      //console.log(x[i]);
      //console.log(z[i]);
      if(x[i].includes(name)){
        console.log('entered if body');
        y.push(z[i]);
      }
    }
    //var directedto='/'+name;
    res.render('searcheditems',{suggestedmovies:y});
  }
});
function noOccInWatchlist(name,req){
  var database = JSON.parse(fs.readFileSync("Users/users_ass.json"));
  for(var i=0;i<database.length;i++){
    if(database[i].username==req.session.username){
      return !exist(name,database[i].watchlistU);
    }
  }
}
function addtowatchlist(name,req){
  var database = JSON.parse(fs.readFileSync("Users/users_ass.json"));
  var i;
  for(i=0;i<database.length;i++){
    if(database[i].username==req.session.username){
     if(!exist(name,database[i].watchlistU))
       database[i].watchlistU.push(name);
       break;
     } 
  }
  fs.writeFileSync('Users/users_ass.json',JSON.stringify(database));
}
function isPrefix(x,y){
  if(y.length<x.length){
      return false;
  }
  for(var i=0;i<y.length&&i<x.length;i++){
      if(x.charAt(i)!=y.charAt(i)){
        return false;
      }
  }
  return true;
}
function oneOfPres(x,y){
  if(y.length<x.length)
    return false;
  var ys=y.split(" ");
  for(var i=0;i<ys.length;i++){
      if(isPrefix(x,ys[i])){
        return true;
      }
  }
  return false;
}

app.get('searcheditems',function(req,res){
  if (!req.session.loggedin){
    res.redirect('/');
  }
  else{
    res.render('searcheditems')
  }

});

app.get('*',function(req,res){
  res.send('404 NOT FOUND');
});
var port_num = process.env.PORT || 3000;
app.listen(port_num);

// END HERE //

module.exports = app;