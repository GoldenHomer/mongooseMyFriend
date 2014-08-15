var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Article', function(){
  it('creates new article and responds with json success message', function(done){
    request(app)
    .post('/api/article')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"article": {"title":"Johnson reports that Wintjiya was born at Mulparingya, \"a swamp and spring to the northeast of Kintore\", west of Alice Springs.","excerpt":"Bedel Hall in the south was formally amalgamated with St Mary Hall in 1505.","content":"The Steppe, which has been called a \"dictionary of Chekhov's poetics\", represented a significant advance for Chekhov, exhibiting much of the quality of his mature fiction and winning him publication in a literary journal rather than a newspaper.","published":true,"created":"1977-04-05T08:21:01.399Z"}})
    .expect(201)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body._id;
      done();
    });
  });
});

describe('GET List of Articles', function(){
  it('responds with a list of article items in JSON', function(done){
    request(app)
    .get('/api/articles')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Article by ID', function(){
  it('responds with a single article item in JSON', function(done){
    request(app)
    .get('/api/article/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Article by ID', function(){
  it('updates article item in return JSON', function(done){
    request(app)
    .put('/api/article/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "article": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE Article by ID', function(){
  it('should delete article and return 200 status code', function(done){
    request(app)
    .del('/api/article/'+ _id) 
    .expect(204, done);
  });
});