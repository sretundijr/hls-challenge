const express = require('express');
const { getIt } = require('hls-fetcher/index');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const cors = require('cors');

const { getManifest } = require('./modify-playlists');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.static('streams'));

app.use((req, res, next) => {
  let subDir = req.url.slice(1);
  const index = subDir.indexOf('/');
  subDir = subDir.substring(0, index);
  const playlist = req.url.substring(index + 2, req.url.length);
  if (!req.query.hasOwnProperty('hlsurl')) {
    res.sendFile(path.join(__dirname, `../streams/${subDir}`, playlist));
  } else {
    next();
  }
});

app.get('/stream', (req, res) => {

  // create a stream subdir
  const subDir = path.resolve(process.cwd(), 'streams');

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

        const basePath = path.basename(req.query.hlsurl)

        let manifestFileName = '';
        if (basePath.includes('?')) {
          manifestFileName = basePath.match(/^.+\..+\?/)[0];
          manifestFileName = manifestFileName.substring(0, manifestFileName.length - 1);
        } else {
          manifestFileName = path.basename(req.query.hlsurl);
        }

        getManifest(
          manifestFileName,
          () => {
            res.sendFile(path.join(__dirname, '../streams', 'manifest.m3u8'));
          }
        )
      }
    }
  )
});

app.listen(PORT);

