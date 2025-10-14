

## ドキュメンテーション

### セットアップ

.npmrcの仕様により、そのままだと`npm install`ができない
そのため、以下のコマンドをターミナルが実行中にする必要がある

```
export NPM_TOKEN=NPM_TOKENの値
```
※実際の値は.env.localを参照すること

このコマンドを実行すると

- `npm install`
- `npm add`
- `npm build`

などが可能になる。
本番環境などの設定は特段必要なし

