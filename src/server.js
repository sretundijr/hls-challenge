const express = require('express');
const { getIt } = require('hls-fetcher/index');
const fs = require('fs');

var cors = require('cors')

const app = express();

const PORT = 8080;

app.get('/', (req, res) => {



});

app.listen(PORT);
