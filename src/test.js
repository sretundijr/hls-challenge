
const { getIt } = require('hls-fetcher/index');
const path = require('path');
const mkdirp = require('mkdirp');


const subDir = path.resolve(process.cwd(), 'streams');

mkdirp(subDir, (err) => err ? console.error(err) : console.log('success'));

getIt(
  {
    uri: 'https://player.vimeo.com/external/249414131.m3u8?s=10bf9d088fff85588fdd56dacd5f9f716c1c8dd5',
    cwd: `${process.cwd()}/streams`,
  },
  (err) => err ? console.log(err) : console.log('downloaded successfully')
)

