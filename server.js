// define port
const PORT = process.env.PORT || 8081;
// import express
const express = require('express');
const app = express();




app.listen(PORT,()=>console.log(`Rule Validation Api is running on port  ${PORT}`));