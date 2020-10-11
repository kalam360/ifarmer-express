const express = require('express')
let config = require('./config.json')
const {DeFiSDK} = require('defi-sdk')

const app = express();

const port = 3000;

// Multichain Setup
let multichain = require("multichain-node")({
  port: 2021,
  host: "13.229.56.89",
  user: config.user,
  pass: config.pass,
});



// DeFi Setup
nodeURL = config.nodeURL;
const defisdk = new DeFiSDK(nodeURL);




app.get("/multichain/getinfo", (req, res) => {
  multichain.getInfo((err, info) => {
    if (err) {
      throw err;
    }
    res.send(info);
  });
});

app.get('/defi/protocols', (req, res) => {
    defisdk.getProtocolNames().then((protocols) => {
      res.send(protocols)
    });

})



app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`)
})