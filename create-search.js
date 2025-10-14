const fs = require('fs');
const path = require('path');

const docs = fs.readdirSync('./docs');
const files = docs.filter(file => {
  const [title, extension] = file.split('.');
  return extension === 'md';

}).map((file, i) => {
  const pathName = path.resolve(`./docs/${file}`);

  const content = fs.readFileSync(pathName, {encoding: 'utf-8'});
  const [title, ...extension] = file.split('.');

  console.log(`[log] create-seacrh-data: ${title}`);
  return {
    id: i.toString(),
    title: title,
    content: content,
  }
}).filter(x => x != null);

fs.writeFileSync('./search-data.json', JSON.stringify(files));