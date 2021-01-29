// define port
const PORT = process.env.PORT || 8081;
// import the app module from app.js
const app = require('./app');

// run the server on defined port
app.listen(PORT,()=>console.log(`Rule Validation Api is running on port  ${PORT}`));