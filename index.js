#!/usr/bin/env node

'use strict';

const client_id = '35e5b7917b064414b7dc384e07d6dab8'; // Your client id
const client_secret = require('./.client_secret');
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

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
  .command('start')
  .action(() => {
    console.log('Placeholder event START');
  })

program.parse(process.argv);

if (program.args.length === 0) program.help();
