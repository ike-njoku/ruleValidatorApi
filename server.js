// define port
const PORT = process.env.PORT || 8081;
// import express
const express = require('express');
const app = express();
// import cors for cross origin resource sharing
const cors = require('cors');
// routes to use
const appRoutes = require('./routes/json/app.route');



// apply cors (no sensitive information is passed / received by the server, so cors origin is set to all by default)
app.use(cors());
// allow app to accept and work with json payload
app.use(express.json());
// use routes
app.use('/', appRoutes);






// run the server on defined port
app.listen(PORT,()=>console.log(`Rule Validation Api is running on port  ${PORT}`));