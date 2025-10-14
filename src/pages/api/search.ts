import lunr from 'lunr';
import { NextApiRequest, NextApiResponse } from "next";
import searchData from '../../../search-data.json';
import * as lunrLanguages from 'lunr-languages';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`[LOG] search: ${req.query.q}`);

  const builder = new lunr.Builder();
  lunr.tokenizer.separator = /[\s]+/;

  builder.ref('id');
  builder.field('titie');
  builder.field('content');

  searchData.forEach((post) => builder.add(post));

  const index = builder.build();

  const results = index.search(req.query.q as string);
  const searchResult = results.map(x => searchData.find(sd => sd.id === x.ref)!).filter(Boolean);
  res.send(searchResult);
}