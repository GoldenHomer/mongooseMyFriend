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
	isAlive : Boolean,
	}, {strict: false}) // allow properties not defined in schema.);
	userSchema.pre('save', function(next){
		var err = new Error('Game over man.')
		next(err); // runs the next middleware in parallel
	});

userSchema.methods.isYounger = function(){ // A method for use in all User models.
	return this.model('User').age < 50 ? true : false;
}

var User = mongoose.model('User', userSchema);

var Bort = new User({
	name: 'Bort',
	age: 10,
	DOB: '10/02/1994',
	isAlive : true
});

Bort.save(function(err, data){
	err ? console.log(err) : console.log('Saved : ' + data);
});

/*myDoc.save(function(err){
	console.log(err.message);
})
*/
console.log('isYounger : ' + Bort.isYounger());