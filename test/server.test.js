// import assert 
const assert = require('assert');
// import supertest to help run tests
const request = require('supertest');
// import the app from app.js (top level directory) 
const app = require('../app');

const payLoad = {
  "rule": {
    "field": "missions.count",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": {
      count: 45,
      successful: 44,
      failed: 1
    }
  }
};

describe('GET /', () => {
  it('returns my details', (done) => {

    const expectedResponse = {
      "message": "My Rule-Validation API",
      "status": "success",
      "data":{
      "name": "Ike-Njoku David Chukwunweike",
      "github": "@ike-njoku",
      "email": "ikenjokudc@gmail.com",
      "mobile": "07038792802",
      "twitter": "@ikenjoku_david"}
    };

    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, expectedResponse, done);
  });
});



// -------------- rule validation test
// rule field missing
describe('POST /validate-rule - with missing fields', () => {
  it('responds with an error when the rule field is absent', (done) => {
    const payLoad = {
        "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": {
          count: 45,
          successful: 44,
          failed: 1
        }
      }
    };

    const expectedResponse = {
      "message": "rule is required.",
      "status": "error",
      "data": null
    };
    
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(payLoad)
      .expect('Content-Type', /json/)
      .expect(400, expectedResponse, done);
  });

  // if the data field is empty
  it('responds with an error when the data field is absent', (done) => {
    const payLoad = {
      "rule": {
        "field": "missions.count",
        "condition": "gte",
        "condition_value": 30
      }
    };

    const expectedResponse = {
      "message": "data is required.",
      "status": "error",
      "data": null
    };
    
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(payLoad)
      .expect('Content-Type', /json/)
      .expect(400, expectedResponse, done);
  });

});


// typeof for rule field 
describe('POST /validate-rule - with invalid types', () => {
  // rule field

  it('it should return an error if the rule field is an array', (done) => {
    
    const payLoad = {
      "rule": [1,2,'Adamchi'],
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": {
          count: 45,
          successful: 44,
          failed: 1
        }
      }
    };
    

    const expectedResponse = {
        "message": "rule should be an object.",
        "status": "error",
        "data": null
    };

    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(payLoad)
      .expect('Content-Type', /json/)
      .expect(400, expectedResponse, done);

  });


  it('it should return an error if the rule field is a number', (done) => {
    
    const payLoad = {
      "rule": 700,
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": {
          count: 45,
          successful: 44,
          failed: 1
        }
      }
    };
    

    const expectedResponse = {
        "message": "rule should be an object.",
        "status": "error",
        "data": null
    };

    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(payLoad)
      .expect('Content-Type', /json/)
      .expect(400, expectedResponse, done);

  });

  
  // data field
  it('it should return an error if the data field is a number', (done) => {
    
    const payLoad = {
      "rule": {
        "field": "missions.count",
        "condition": "gte",
        "condition_value": 30
      },
      "data": 1
    };
    

    const expectedResponse = {
      "message": "data should be a string, array or object.",
      "status": "error",
      "data": null
    };

    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(payLoad)
      .expect('Content-Type', /json/)
      .expect(400, expectedResponse, done);

  });  

});

describe('POST /validate-rule  - json payload validity ', () => {

  it(' should return an error if an invalid json payload is passed ', (done) => {

    const payload = '[1, 2, 3, 4, ]';

    const expectedResponse = {
      "message": "Invalid JSON payload passed.",
      "status": "error",
      "data": null
    };

    request(app)
    .post('/validate-rule')
    .type('json')
    .send(payload)
    .expect('Content-Type', /json/)
    .expect(400, expectedResponse, done);
  });
  
});

describe('POST /validate-rule - rule field is absent in data', () => {
  
  it('should return an error if rule field is absent in data', (done) => {

    const payLoad = {
      "rule": {
        "field": "age",
        "condition": "gte",
        "condition_value": 30
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "position": "Captain",
        "missions": {
          count: 45,
          successful: 44,
          failed: 1
        }
      }
    };

    const expectedResponse = {
      "message": "field age is missing from data.",
      "status": "error",
      "data": null
    };
    
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(payLoad)
      .expect('Content-Type', /json/)
      .expect(400, expectedResponse, done);


  });

  it('should return an error if nested rule field is absent in data', (done) => {

    const payLoad = {
      "rule": {
        "field": "missions.count",
        "condition": "gte",
        "condition_value": 30
      },
      "data": {
        "name": "James Holden",
        "age": 34,
        "crew": "Rocinante",
        "position": "Captain",
        "missions": {
          successful: 44,
          failed: 1
        }
      }
    };

    const expectedResponse = {
      "message": "field missions.count is missing from data.",
      "status": "error",
      "data": null
    };
    
    request(app)
      .post('/validate-rule')
      .set('Accept', 'application/json')
      .send(payLoad)
      .expect('Content-Type', /json/)
      .expect(400, expectedResponse, done);


  });


});




