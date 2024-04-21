const express = require('express')
const serverless = require('serverless-http')
const { Router } = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appconfig = require('../../app/config/appConfig');
const setRouter = require('../../app/route/route');
const cors = require('cors'); // Add this line

const api = express();

api.use(cors());

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

const router = Router();

mongoose.connect(appconfig.db.uri, { useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.on('error', () => {
    console.log('data base connection is error')
})

mongoose.connection.on('open', () => {
    console.log('data base connection is open')
})

router.get('/', (req, res) => {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    res.write(`data: ${JSON.stringify('connection established')}\n\n`);
})

setRouter.setRouter(router);

api.use("/api/", router);

module.exports.handler = serverless(api);
