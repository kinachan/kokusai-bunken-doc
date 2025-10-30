import elasticlunr from 'elasticlunr';
import { NextApiRequest, NextApiResponse } from "next";
import searchData from '../../../search-data.json';
import kuromoji from 'kuromoji';
import path from 'path';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`[LOG] search: ${req.query.q}`);

  const dictPath = path.resolve('./src/lib/kuromojidict');

  const elasticLunr = elasticlunr();
  elasticLunr.setRef('id' as never);
  elasticLunr.addField('title'as never);
  elasticLunr.addField('content'as never);

  kuromoji.builder({
    dicPath: dictPath,
  }).build((err, tokenizer) => {
    if (err) throw err;

    searchData.forEach(doc => {
      const contentTokens = tokenizer.tokenize(doc.content).map(t => t.surface_form).join(' ');
      const titleTokens = tokenizer.tokenize(doc.title).map(t => t.surface_form).join(' ');

      elasticLunr.addDoc({
        id: doc.id,
        title: titleTokens,
        content: contentTokens,
      });
    });

    const searchResults = elasticLunr.search(req.query.q as string, {
      fields: {
        content: {boost: 1},
      }
    });
  
    const results = searchResults.map(r => searchData.find(x => x.id === r.ref));
    res.send(results);
  });
}