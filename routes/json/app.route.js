// import express
const express = require('express');
const router = express.Router();
// import rule validator
const RuleValidator = require('../../services/ruleValidator.service');
// initialize rule validator 
const ruleValidator = new RuleValidator();
// import data validator
const DataValidator = require('../../services/dataValidator.service');
// initialize the data validator
const dataValidator = new DataValidator();

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
    let responseBody = null;

    // ------------------------------------ Rule Validation 
   

    if (responseBody == null) {
        // check for the presence of the rule field
        if (ruleValidator.checkRuleFieldPresence(request.body) == false) {
            responseBody = {
                "message": "rule is required.",
                "status": "error",
                "data": null
            };
        }
    }   


    // check the type for the rulefield passed in the payload
    if (responseBody == null) {
        if (ruleValidator.checkRuleFieldType(request.body.rule) == false) {
            responseBody = {
                "message": "rule should be an object.",
                "status": "error",
                "data": null
            };
        }
    }

    
    if (responseBody == null) {
         // ----------------  Data validtion 
         if (dataValidator.checkDataFieldPresence(request.body) == false) {
             responseBody = {
                "message": "data is required.",
                "status": "error",
                "data": null
            };
        }
    }
   

    if(responseBody == null) {
        if (dataValidator.checkDataFieldType(request.body.data) == false) {
            // check for the dataFieldType
           responseBody = {
                "message": "data should be a string, array or object.",
                "status": "error",
                "data": null
           };
        }
    }

    if (responseBody == null) {
        if (dataValidator.checkForField( request.body.rule.field, request.body.data) == false) {
            responseBody = {
                "message": `field ${request.body.rule.field} is missing from data.`,
                "status": "error",
                "data": null
            };

        }
    
    }

    if (responseBody.status == 'error') response.status(400).json(responseBody)
    else response.status(200).json(responseBody);

});

// export the router
module.exports = router;