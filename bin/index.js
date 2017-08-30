#!/usr/bin/env node

'use strict';
const program = require('commander'),
    fs = require('fs'),
    exec = require('child_process').exec;


let listFunction = (directory, options) => {
    console.log('list');
}

program
    .version('0.0.1')
    .command('list [directory]')
    .description('List files and folders')
    .option('-a, --all', 'List all files and folders')
    .option('-l, --long', '')
    .action('');

program.parse(process.argv); // end with parse to parse through the input