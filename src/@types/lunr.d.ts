
declare module 'lunr-languages' {
  export function lunrMulti(lunr: typeof lunr): void;
  export function lunrStemmerSupport(lunr: typeof lunr): void;
  export function lunrEn(lunr: typeof lunr): void;
  export function lunrDe(lunr: typeof lunr): void;
  // 必要な言語モジュールを追加
}