// import express
const express = require('express');
const router = express.Router();
// import rule validator
const RuleValidator = require('../../services/ruleValidator.service');
const ruleValidator = new RuleValidator();

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
router.post('/validate-rule',(request, response) => {
    // if validation == true, return the response body
    let validation = true;
    // check for the presence of the rule field
    if(ruleValidator.checkRuleFieldPresence(request.body) == false){ response.status(400).json({
        "message": "rule is required.",
        "status": "error",
        "data": null
    }) ; validation = false ;}

    // check the type for the rulefield passed in the payload
    if(ruleValidator.checkRuleFieldType(request.body.rule) == false){response.status(400).json({
        "message": "rule should be an object.",
        "status": "error",
        "data": null
    }); validation = false; }

    if(validation == true)response.json(request.body);

});

module.exports = router;