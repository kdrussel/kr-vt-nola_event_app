const express = require('express') // importing it into our server  
const app = express()  // bringing it in
const port = 3000 // new javascript. same as var
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());


// server.js port
app.listen( port, function(err) {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`Magic is happening on ${port}`) // also can use + port (the variable/const)
});


// heroku port
app.listen( process.env.PORT || 5000, function(err) {  
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`Magic is happening on ${process.env.PORT}`) 
});

// connecting to MongoDB
mongoose.connect('mongodb://heroku_80qw2s7r:b1vc3occl53jkgiled19u0jj6v@ds151702.mlab.com:51702/heroku_80qw2s7r', function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});


// new MongoDB schema for createAccount
Schema = new mongoose.Schema({
	firstName			: String,
	lastName			: String,
	signInEmail			: String,
	password 			: String,
	confirmPassword		: String
},{ collection: 'accounts'});

var userAccounts = mongoose.model('accounts', Schema);

// a new account is created and pushed into existing userAccounts array in MongoDB
app.post('/create-Account', function(request,response){
	var accounts = new userAccounts(request.body);

	accounts.save(function (){
			response.json(accounts);
		}
	)
});

// get all accounts

app.get('/all-accounts', function(request, response) {  
	userAccounts.find({},function(err,userAccounts){
		if(err){
			console.log(err)
		}else{
			response.json(userAccounts);
		}
	});
});


// new MongoDB schema for allEvent
eventSchema = new mongoose.Schema({
		title		: String,
		type 		: [String],
		description	: String,
		website		: String,
		street 		: String,
		city 		: String,
		state 		: String, 
		zip			: String,
		startDate	: String, 
		endDate		: String,
		startTime	: String, 
		endTime		: String,
		ageRestriction: String,
		admission 	: String,
		fleur		: String,
},{ collection: 'events'});

var Events = mongoose.model('events', eventSchema);

// grab the event collection from MongoDB
app.get('/all-event', function(request, response) {  
 	Events.find({},function(err,Events){
		if(err){
			console.log(err)
		}else{
			response.json(Events);
		}
	});
});

// new event created + pushed into existing Events array in MongoDB
app.post('/create-Event', function(request,response){
	var createEvent = new Events(request.body);

	createEvent.save(function(){
		response.json(createEvent);
	})

});


// define the folder that will be used for static assets
app.use(express.static('public'));










// a new event is being created and pushed into existing event array
app.post('/new-event', function(request, response) { 
	event.push(request.body); 
	response.send(event);
});





// a new account is created and pushed into existing userAccounts array in server.js

// app.post('/create-Account', function(request,response){
// 	userAccounts.push(request.body);
// 	response.send(userAccounts);
// });



















// filtering free Admission 

app.get('/freeAdmission', function(request, response) {  
    var result;

    for(i = 0; i < event.length; i++){
		
	if (event[i].admission == 0){
		 return result = event[i];
		 // looping through all event to check if the value is equal to 0 and returning the whole event object
	} else {
		return null;
		}
	}
	
	response.send(result);
});  





// function filterAdmissionFree() {
//     var result = [];

//     for(i = 0; i < event.length; i++){
//     	var admission = parseInt(event[i].admission);
//     	if (event[i].admission == 0){
//     		return result;
//     	} else {
//     		return null;
//     	}
//     }
// };


