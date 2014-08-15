var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/friendDB');

var db = mongoose.connection;

db.on('error', function () {
	console.log('ERRORS!', err);
});

db.once('open', function(){
	console.log('Connected');
});

// THE SCHEMA

var Schema = mongoose.Schema;
var userSchema = new Schema({
	name : String,
	age : Number,
	DOB : Date,
	isAlive : Boolean
});

var User = mongoose.model('User', userSchema);

var Bort = new User({
	name: 'Bort',
	age: 10,
	DOB: '10/02/1994',
	isAlive : true
});

Bort.save(function(err, data){
	err ? console.log(err) : console.log('Saved : ' + data);
})