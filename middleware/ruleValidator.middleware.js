// validate the (json) payload received 
const ruleValidator = (request, response, next)=>{
    console.log(` this is the url that was hit:  ${request.url} `);

    



    next();
}

module.exports = ruleValidator;