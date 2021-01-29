// import express
const express = require('express');
const router = express.Router();
// import the validator
const ruleValidator = require('../../middleware/ruleValidator.middleware');


// GET ( get my data)
router.get('/', (request, response)=>{
    // send a json response with a status code of 200
    response.status(200).json({
        "message": "My Rule-Validation API",
        "status": "success",
        "data":{
        "name": "Ike-Njoku David Chukwunweike",
        "github": "@ike-njoku",
        "email": "ikenjokudc@gmail.com",
        "mobile": "07038792802",
        "twitter": "@ikenjoku_david"}
      })


});

// POST
// validate the request using the rule validator middlware
router.post('/validate-rule',ruleValidator, (request, response)=>{
    

});

module.exports = router;