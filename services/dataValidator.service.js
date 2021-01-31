class DataValidator{
    // check for the presence of the data field
    checkDataFieldPresence(requestBody){
        // takes the request body and returns false if there there is no data field in it
        if(!requestBody.data){
            return false;
        }
    };

    // checking typeof for data field
    checkDataFieldType(dataField) {
        const dataFieldType = typeof dataField;
        console.log(dataFieldType);

        const expectedTypes = ['object', 'string'];
        if (!expectedTypes.includes(dataFieldType)) return false;
    }

    // check if field from rule exists in data 
    checkForField(fieldName, data) {
        const children = fieldName.split('.');
        let currentChildIndex = 0;
        let currentChild = children[currentChildIndex];
        let currentObject = data;
        while(currentChildIndex < children.length) {
            currentChild = children[currentChildIndex];
            if (!(currentChild in currentObject)) return false;
            currentChildIndex++;
            currentObject = currentObject[currentChild];
        }
    }
}

module.exports = DataValidator;