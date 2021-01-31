 class RuleValidator {

    constructor(dataValidator) {
        this.dataValidator = dataValidator
    }

    validate(requestBody) {

        // ------------------------------------ Rule Validation 
       

        // check for the presence of the rule field
        if (this.checkRuleFieldPresence(requestBody) == false) {
            return {
                "message": "rule is required.",
                "status": "error",
                "data": null
            };
            
        }
    
    
        // check the type for the rulefield passed in the payload
            if (this.checkRuleFieldType(requestBody.rule) == false) {
                return {
                    "message": "rule should be an object.",
                    "status": "error",
                    "data": null
                };
            }
    
        
             // ----------------  Data validtion 
             if (this.dataValidator.checkDataFieldPresence(requestBody) == false) {
                 return {
                    "message": "data is required.",
                    "status": "error",
                    "data": null
                };
            }
       
    
            if (this.dataValidator.checkDataFieldType(requestBody.data) == false) {
                // check for the dataFieldType
               return {
                    "message": "data should be a string, array or object.",
                    "status": "error",
                    "data": null
               };
            }
    
            if (this.dataValidator.checkForField( requestBody.rule.field, requestBody.data) == false) {
                return {
                    "message": `field ${requestBody.rule.field} is missing from data.`,
                    "status": "error",
                    "data": null
                };
            }

            const conditionValue = requestBody.rule.condition_value;
            const condition = requestBody.rule.condition;
            const field = requestBody.rule.field;
            const fieldValue = this.dataValidator.getFieldValue(field, requestBody.data);

            let conditionValid = false;
           
            // switch case
            switch (condition) {
                case 'eq':
                    conditionValid = fieldValue == conditionValue;
                    break;
            
                case 'neq':
                    conditionValid = fieldValue != conditionValue;
                    break;

                case 'gt':
                    consitionValid = fieldValue > conditionValue;
                    break;
            
                case 'gte':
                    conditionValid = fieldValue >= conditionValue;
                    break;

                default:
                    break;
            }

            const message = conditionValid ? `field ${field} successfully validated.` : `field ${field} failed validation.`;
            return {
                "message": message,
                "status": conditionValid ? 'success' : 'error',
                "data": {
                    "validation": {
                        "error": !conditionValid,
                        "field": field,
                        "field_value": fieldValue,
                        "condition": condition,
                        "condition_value": conditionValue
                    }
                }
            };
        }


    // check for the presence of the rule field
    checkRuleFieldPresence(body) {
        if (!body.rule) return false;
    }

    // check for the data type passed as the rule field (should be an object)
    checkRuleFieldType(ruleField) {
        const ruleFieldType = typeof ruleField;
        if (ruleFieldType !== 'object') return false;

        if (Array.isArray(ruleField)) return false;

        if (ruleField == null) return false;
    };


    // -------------------------------   check rule field payload validity
    checkAllRuleFields(ruleField) {
        if (ruleField.length < 3) return false;
        
        // refactor this portion later
        if (!ruleField.field || ruleField.field =='') return false;

        if (!ruleField.condition || ruleField.condition =='') return false;

        if (!ruleField.condition_value || ruleField.condition_value =='') return false;
    }



}



module.exports = RuleValidator;