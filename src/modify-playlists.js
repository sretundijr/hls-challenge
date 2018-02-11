
const m3u8Read = require('m3u8-reader');
const m3u8Write = require('m3u8-write');
const fs = require('fs');
const path = require('path');

const getManifest = (manifestFileName, callback) => {

  // let manifestFileName = path.basename(req.query.hlsurl).match(/^.+\..+\?/)[0];
  // manifestFileName = manifestFileName.substring(0, manifestFileName.length - 1);

  const file = `${process.cwd()}/streams/${manifestFileName}`;

  const newFile = modifyPlaylistsEndpoint(file, 'http://localhost:8080');

  fs.writeFileSync(file, newFile, 'utf8');

  callback();
}

const modifyPlaylistsEndpoint = (playlist, endpoint) => {

  const currentPlaylist = m3u8Read(fs.readFileSync(playlist, 'utf8'));

  modifiedPlaylist = currentPlaylist.map((item) => {
    if (typeof (item) === 'string') {
      return `${endpoint}/${item}`;
    }
    return item;
  });

  return m3u8Write(modifiedPlaylist);
}

module.exports = { modifyPlaylistsEndpoint, getManifest };
