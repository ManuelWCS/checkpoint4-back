const express = require('express');
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const router = require('./routes/index.routes');

app.use(cors());
app.use('/', router);
app.get("/", (req, res) => {
res.send("Welcome to the checkpoint 4");
});

module.exports = app;