const fs = require('fs');
const env = require('dotenv');

const isDev = process.env.NODE_ENV === 'development';
const isVercel = process.env.VERCEL === '1';

const source = fs.readFileSync('./.npmrc-source.txt', {encoding: 'utf-8'});

if (!isVercel && !isDev) {
  fs.writeFileSync('./.npmrc', source, {encoding: 'utf-8'});
  console.log(`[LOG] Create .npmrc File by Production.`);
  return;
}


env.config({path: '.env.local'});

const result = source.replace('${NPM_TOKEN}', process.env.NPM_TOKEN);
fs.writeFileSync('./.npmrc', result, {encoding: 'utf-8'});

console.log(`[LOG] Create .npmrc File by Development.`);