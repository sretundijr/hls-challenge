const express = require('express');
const { getIt } = require('hls-fetcher/index');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const app = express();

const PORT = 8080;

app.get('/stream', (req, res) => {
  // create a stream subdir
  const subDir = path.resolve(process.cwd(), 'streams');

  console.log(req.query);
  mkdirp(subDir, err => err ? console.error(err) : console.log('directory created'));

  getIt(
    {
      uri: req.query.hlsurl,
      cwd: `${process.cwd()}/streams`,
    },
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('files downloaded');
        res.status(200).json({ hello: 'world' });
      }
    }
  )

});

app.listen(PORT);
