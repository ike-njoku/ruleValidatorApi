// validate the (json) payload received 
const ruleValidator = (request, response, next)=>{
    console.log(` this is the url that was hit:  ${request.url}`);

    // action to take on the HTTP post method
    response.send(Json.stringify(request));



    next();
}

module.exports = ruleValidator;