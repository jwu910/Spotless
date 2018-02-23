#!/usr/bin/env node
'use strict';


const Spotify = require('node-spotify-api');
const client_keys = require('./.client_keys');
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

const spotify = new Spotify({
  id: client_keys.client_id,
  secret: client_keys.client_secret
});

const { exec } = require('child_process');
const program = require('commander');

program
  .version('0.0.1')

program
  .command('play')
  .action(() => {
    exec('playerctl play');
  })

program
  .command('pause')
  .action(() => {
    exec('playerctl pause');
  })

program
  .command('next')
  .action(() => {
    exec('playerctl next');
  })

program
  .command('previous')
  .action(() => {
    exec('playerctl previous');
  })

program
  .command('search <search_string>')
  .action((searchString) => {
    spotify.search({ type: 'track', query: searchString }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      data.tracks.items.forEach(track => {
        console.log(track.artists[0].name + ' - ' + track.name + ' [' + track.album.name + ']');
      }); 
    });
  })

program
  .command('start')
  .action(() => {
    console.log('Placeholder event START');
  })

program.parse(process.argv);

if (program.args.length === 0) program.help();
