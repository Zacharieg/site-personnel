const http = require('http');
const express = require('express');
const path = require('path'); const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '/public/views'))

app.use('/', function (req, res) {
    res.render('index')
}); const server = http.createServer(app);

const port = 4000;
server.listen(port); console.debug('Server listening on port ' + port);