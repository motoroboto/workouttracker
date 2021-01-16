const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./models");
const logger = require("morgan");
const mongoose = require("mongoose");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(require('./routes/api-routes'));
app.use(require('./routes/html-routes'));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workouts',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
});