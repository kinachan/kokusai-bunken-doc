const fs = require('fs');
const { v4: uuid } = require('uuid');

const envMap = [
  ['NEXT_PUBLIC_PROJECT_NAME', process.argv[2]],
  ['BASIC_AUTH_USER', uuid().replaceAll('-', '')],
  ['BASIC_AUTH_PASSWORD', uuid().replaceAll('-', '')],
];
console.log(`[INFO] \"${process.argv[2]}\"をプロジェクト名に設定します`);

const text = envMap.map(([key, value]) => {
  return `${key}=${value}`
}).join('\n');

fs.writeFileSync('.env', text, {encoding: 'utf-8'});

console.log(`[INFO] 設定が完了しました、以下の情報をお伝えください。`)
console.log(`[INFO] UserId: ${envMap[1][1]}`)
console.log(`[INFO] Password: ${envMap[2][1]}`)