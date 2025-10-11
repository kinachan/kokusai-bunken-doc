
import path from "path";
import fs from 'fs';

export const getFileName = () => {
  const docsDir = path.join(process.cwd(), "docs");
  const fileNames = fs.readdirSync(docsDir)
    .filter((file) => !file.startsWith('_') && file.endsWith(".md"))
    .map(x => x.replace('.md', ''))

  return fileNames;
}


export const getFileContent = (fileName: string) => {
  const ROOT = path.resolve('./');

  try {
    return fs.readFileSync(
      path.join(ROOT, 'docs', `${fileName}.md`),
      { encoding: 'utf-8' }
    )
  } catch (err) {
    return null;
  }
}