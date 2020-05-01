const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const aylien = require("aylien_textapi")
let data = []

// configuting server
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('dist'))
app.get('/', function (req, res) {res.sendFile('dist/index.html')})

// configuring env
const dotenv = require('dotenv')
dotenv.config()

// init aylien api
var textapi = new aylien({
    application_id: process.env.APIID,
    application_key: process.env.APIKEY
});

// fetching data from aylien api
app.post('/fetchAnalysis', (req, res) => {
    console.log(req.body.searchText)
    textapi.combined(req.body.searchText, function (error, response) {
        if (error === null) {
            data.push(response)
            res.send(response)
        } else {
            res.status(500).send({ 'error': error })
            console.log(error)
        }
    });
});

// returning analysis to client
app.get('/getAnalysis', (req, res) => {
    res.status(200).send(data);
});


module.exports = app