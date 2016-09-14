var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var port = process.env.PORT || 8080;
var pg = require('pg');
var connectionString= 'postgress://localhost:5432/koala_holla';


// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/getKoalas', function( req, res ){
  console.log( 'getKoalas route hit' );
  //assemble object to send

  pg.connect(connectionString,function(err, client, done){
    if(err){
      console.log(err);
    }
    else{
      console.log('successfully connected in /getKoalas');
      var resultsArray=[];
      var queryResults=client.query('SELECT * FROM koalas');
        queryResults.on('row',function(row){
          resultsArray.push(row);
          console.log(resultsArray);

        });//on row function
        queryResults.on('end',function(){
          done();
        return  res.send(resultsArray);
        });

    }//else
  });//pg. connect
  //send info back to client
});

// add koala
app.post( '/addKoala', urlencodedParser, function( req, res ){
  console.log( 'addKoala route hit' );
  var data= req.body;
  //assemble object to send
  pg.connect(connectionString,function(err, client, done){
    if(err){
      console.log(err);
    }
    else{
      console.log('successfully connected in /addKoala');
      client.query('INSERT INTO koalas (name,sex,age,transferrabe,notes ) VALUES ($1,$2,$3,$4,$5)',[data.name,data.sex,data.age,data.readyForTransfer,data.notes]);

    }//else
  });//pg. connect
});

// add koala
app.post( '/editKoala', urlencodedParser, function( req, res ){
  console.log( 'editKoala route hit' );
  //assemble object to send
  client.query('UPDATE koalas SET name=$1,sex=$2,age=$3,readyForTransfer=$4,notes=$5 WHERE id=$1',[data.name,data.sex,data.age,data.readyForTransfer,data.notes]);

});//app.post
