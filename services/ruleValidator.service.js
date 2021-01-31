 class RuleValidator {


    // check for the presence of the rule field
    checkRuleFieldPresence(body) {
        if(!body.rule) return false;
    }

    // check for the data type passed as the rule field (should be an object)
    checkRuleFieldType(ruleField) {
        const ruleFieldType = typeof ruleField;
        if (ruleFieldType !== 'object') return false;

        if (Array.isArray(ruleField)) return false;

        if (ruleField == null) return false;
    };


    // -------------------------------   check rule field payload validity
    checkAllRuleFields(ruleField){
        if(ruleField.length < 3)return false;
        
        // refactor this portion later
        if(!ruleField.field || ruleField.field =='') return false;

        if(!ruleField.condition || ruleField.condition =='') return false;

        if(!ruleField.condition_value || ruleField.condition_value =='') return false;
        
    }



}



module.exports = RuleValidator;