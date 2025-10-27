const fs = require('fs');
const path = require('path');

console.log(process.env.NODE_ENV);

const isDev = process.env.NODE_ENV === 'development';

const source = fs.readFileSync('./.npmrc-source.txt', {encoding: 'utf-8'});

if (!isDev) {
  fs.writeFileSync('./.npmrc', source, {encoding: 'utf-8'});
  console.log(`[LOG] Create .npmrc File by Production.`);
  return;
}


const env = require('dotenv');
env.config({path: '.env.local'});

const result = source.replace('${NPM_TOKEN}', process.env.NPM_TOKEN);
fs.writeFileSync('./.npmrc', result, {encoding: 'utf-8'});

console.log(`[LOG] Create .npmrc File by Development.`);