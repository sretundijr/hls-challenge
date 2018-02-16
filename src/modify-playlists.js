
const m3u8Read = require('m3u8-reader');
const m3u8Write = require('m3u8-write');
const fs = require('fs');
const path = require('path');

const pathToAddToManifest = 'https://vast-brook-68324.herokuapp.com/'
// const pathToAddToManifest = 'http://localhost:8080';
// const pathToAddToManifest = 'https://testing-hls-challenge-full-stack-steve-jr.c9users.io:8080'


const getManifest = (manifestFileName, callback) => {

  // creates a new manifest file to manage downloads, this file is overwritten
  // to point to the new downloaded hls
  const newManifestFile = `${process.cwd()}/streams/manifest.m3u8`;

  const file = path.resolve(__dirname, '../streams', manifestFileName);

  const newFile = modifyPlaylistsEndpoint(file, pathToAddToManifest);

  // writes to new manifest file, this eliminates the duplication
  // as my changes to hls-fetcher require an unmodified downloaded manifest
  fs.writeFileSync(newManifestFile, newFile, 'utf8');

  callback();
}

const modifyPlaylistsEndpoint = (playlist, endpoint) => {

  const currentPlaylist = m3u8Read(fs.readFileSync(playlist, 'utf8'));

  const modifiedPlaylist = currentPlaylist.map((item) => {
    if (typeof (item) === 'string') {
      return `${endpoint}/${item}`;
    }
    return item;
  });

  return m3u8Write(modifiedPlaylist);
}

module.exports = { modifyPlaylistsEndpoint, getManifest };
