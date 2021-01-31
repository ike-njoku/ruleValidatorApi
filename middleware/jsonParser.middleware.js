const express = require('express');
const internalParser =  express.json();

const jsonParser = (request, response, next) => {

    internalParser(request, response, (error) => {
        if (error) {
            response.status(400).json({
                "message": "Invalid JSON payload passed.",
                "status": "error",
                "data": null
            });
        } 
        else {
            next();
        }
    });
};

module.exports = jsonParser;