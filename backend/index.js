const express = require("express")
const mongoose = require("mongoose")
const morgan = require('morgan')
const helmet = require("helmet")
const app = express()
const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')
const path = require('path')

// Env variable, for mongoDB. Connect to DB.
require('dotenv').config();
try {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Mongoose is connected.")
    });
} catch (error) {
    console.log("Error!");
}

// Parser
app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet({
    contentSecurityPolicy: false,
}));
// Routers
app.use("/pins", pinRoute);
app.use("/users", userRoute);

// Static setup
app.use(express.static(path.join(__dirname, '/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

// Port setup
const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})

// Error handler
app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'ok' : error.stack,
    })
})