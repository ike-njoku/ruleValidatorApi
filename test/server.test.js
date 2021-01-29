// import assert 
const assert = require('assert');
// import supertest to help run tests
const request = require('supertest');
// import the app from app.js (top level directory) 
const app = require('../app');

describe('GET /', () => {
    it('responds with json',(done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200).then(
            response => {
                assert(response.body.status,'success');
                assert(response.body.data.name, 'Ike-Njoku David Chukwunweike');
                assert(response.body.data.email, 'ikenjokudc@gmail.com');
                assert(response.body.data.mobile, '07038792802');
                done();
            }
        ).catch( error => done(error) );
    });
  });

