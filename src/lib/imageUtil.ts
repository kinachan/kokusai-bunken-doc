import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';

// ファイル拡張子に応じた MIME タイプを返す
const getMimeType = (filename: string) => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}



export const sendImage = (fileName: string, filePath: string, res: NextApiResponse) => {
  if (!fs.existsSync(filePath)) {
    res.status(404);
    return;
  }
  const file = fs.readFileSync(filePath);
  res.setHeader('Content-Type', getMimeType(fileName as string))
  res.send(file)
}