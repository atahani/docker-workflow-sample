'use strict';

/***
dependencies
*/
var http = require('http'),
  mongoose = require('mongoose');

var default_port = 5000;
if(process.env.APP_PORT){
  default_port = process.env.APP_PORT;
}
//define mongoose connection string
//NOTE:since 'our_mongodb' link to this container, use 'our_mongodb' name as ip address of mongodb server
mongoose.connect('mongodb://our_mongodb/foo');

var Counter = mongoose.model('Counter',{
  title:String,
  number:{
    type:Number,
    default:0
  }
});

//create server
var server = http.createServer(function(req,res){
  //increment the counter
  Counter.update({title:'Number of Request'},{$inc:{number:1}},{upsert: true})
    .exec(function(err,counter){
      if(err){
        res.end('error happend');
      }
      else{
        Counter.findOne({title:'Number of Request'},function(err,counter){
          if(err){
            res.end('error happend');
          }
          else{
            console.log('the number of request is '+counter.number);
            res.end('the number of request is '+counter.number);
          }
        });
      }
    });
});

//our application listen to port for any incomming request
server.listen(default_port,function(){
  console.log('Server listening on port '+default_port);
});
