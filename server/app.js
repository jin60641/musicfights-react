import express from 'express';
import path from 'path';
import bodyParser = require('body-parser');

import routes from './route';

const app = express();
const port = process.env.PORT||3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('jwt-secret', config.secret)

app.use(routes);
app.use(express.static(path.resolve(__dirname,'..','build')));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'..','build','index.html'));
});


const server = require('http').createServer(app);
require('./socket')(server);
server.listen(port, () => {
  console.log(`listen on ${port}`);
});

module.exports = server;
