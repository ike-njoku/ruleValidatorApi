// import express
const express = require('express');
const router = express.Router();
const RuleValidator = require('../../services/ruleValidator.service');
// import data validator
const DataValidator = require('../../services/dataValidator.service');
// initialize the data validator
const dataValidator = new DataValidator();
// initialize rule validator 
const ruleValidator = new RuleValidator(dataValidator);

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
      });
});

// POST
// validate the request using the rule validator middlware
router.post('/validate-rule', (request, response) => {
    // initialize the response body 
    const responseBody = ruleValidator.validate(request.body);
    const responseStatus = responseBody.status == 'error' ? 400 : 200;

    response.status(responseStatus).json(responseBody);
});

// export the router
module.exports = router;