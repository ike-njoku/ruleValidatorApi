 class RuleValidator {

    // check for the presence of the rule field
    checkRuleFieldPresence(body){
        console.log('...checking if the rule field is present')
        if(!body.rule){console.error(" >>> the rule field is not present"); return false;}else{
            console.log(' >>> rule field is present');
        }
    }

    // check for the data type passed as the rule field (should be an object)
    checkRuleFieldType(ruleField){
        const ruleFieldType = typeof ruleField;
        console.log('...checking rule field type');
        if(ruleFieldType !== 'object'){console.error(` >>> expected rule field to be of type object, but got ${ruleFieldType} `); return false}else{
            console.log(' >>> rule field type checked');
        }
    }


}



module.exports = RuleValidator;