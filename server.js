const http = require('http');
const express = require('express');
const path = require('path');
const { ppid } = require('process');
const app = express();
app.use(express.json());
app.use(express.static("express"));
const bodyParser = require('body-parser');
var writeKey = "eznOJ1f1AE93h0xn2ErLOTWMhYFPq6gP";
var PersonasSpace = "spa_wnSjjB2fhkXX27E7um3Eue";
const axios = require('axios');
var profileApiToken = "ncFTO2SLa9Nm1yJo4NMlIueAabY26wGVH_W4S3Duo62bIm3VGrM-FTXAWy-2jcqNEBOhL_8GmkGqWj0iy0YIdVvkgeqaPmXLLan7gmfaTS2h6pumJE92153DqL07vZds9VBrvzkw70_0FCBhspuCZQCq3WNBq64OcHjUwX_x6FanusJLiqeqx93T3BHwh2ThWfUiySZKXEoDTUFRggRnwg1K0uamfQuKVNOkwf0A-C9Pfj3l6usOOgYOL8eZxREbpjpXbyYMBTrEdADpsNLCGRUAMTI=";
var tokenID = "f79c3194-e19a-455d-bf15-5c17646bd234";

app.use(bodyParser.json());


// default URL for website
//app.use('/', express.static(path.join(__dirname, 'express/index.html')));
app.use(express.static(path.join(__dirname, 'public')));


const server = http.createServer(app);
const port = 3000;
const cors = require('cors');
server.listen(port);
console.debug('Server listening on port ' + port);
//app.use(cors());

//accepts request from client, calls Segment API to retrieve anon_id traits, sends traits back to client
app.post('/userData', async (req, res) => {
    const anon_id = req.body.anon_id;
    console.log("ANON: " + anon_id);
    if (anon_id) {
        let new_anon_id = (anon_id.replace(/['"]+/g, ''));
        let api_url = 'https://profiles.segment.com/v1/spaces/' + PersonasSpace + '/collections/users/profiles/anonymous_id:' + new_anon_id + '/traits?limit=200';
        var hash = btoa(profileApiToken + ':');
        const headers = {
            'Authorization': "Basic " + hash,
            'Content-Type': 'application/json',
        };
        try {
            // Process response here
            const response = await axios.get(api_url, { headers });
            res.json(response.data.traits);
        } catch (error) {
            // Handle the error here, or throw it again if needed
            console.error('Error occurred while making the request:', error);
            res.json({ message: "No data found" });
        }
    }
    res.end();
});
