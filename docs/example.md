# Read Me

こんな感じでファイルを作成していくと、ドキュメントが簡単に作成できます。

---


### セットアップ方法
元のGitのURLをcloneします。

```
git clone https://github.com/kinachan/document-creator.git
```
元のGitを削除します
```
rm -rf .git
```
GitHub上で新規リポジトリを発行します。
コマンドは指示に従ってください。


#### envファイルの修正
.envファイルの中身をコマンドで修正します

```
node setup-env プロジェクト名
```
プロジェクト名は任意のプロジェクト名を設定します（日本語可能）
Basic認証のIDとパスワードも設定されるので、こちらをお客様に伝えます。


##### vercelのセットアップ
GitHubとVercelを紐づけます。


### 設計書

以下のテンプレートを使用する。
Markdownからドキュメントをコピーして使用する

# ドキュメントタイトル

本頁では「」を定義する

## フロー詳細

### 1. カテゴリ

#### フロー項目






### 作成方法

- docs配下にmdファイルを配置します
- 画像は相対パスで記載します。
  - docsに配置する際は`./fileName.png`
  - imgファイルに配置する際は`./img/fileName.png`
- HTML/CSSファイルは修正不要です。
- navbarのリンクも設置されます。
- マークダウンファイルの先頭に`_（アンダースコア）`を設置するとリンクから除外されます

---
画像の設置例

![Logo](./img/yoshi_cocoa.png)


## Markdown Template.
以下がテンプレートファイルです。
コピペしてご利用ください。


# Title1
## Title2
### Title3
#### Title4
##### Title5
###### Title6
text
text2
**Bold**  
*Italic*  


- [ ] a task list item
- [ ] list syntax required
- [ ] normal **formatting**, @mentions, #1234 refs
- [ ] incomplete
- [x] completed
- hogehoge
  - fuga
    - bar
    - [ ] motimot
1. fuba
1. fuba
1. fuba

|table1|table2|table3|
|:--|--:|:--:|
|align left|align right|align center|
|a|b|c|

### Quote
>This is Quote
>This is Quote
>>This is Quote
>>>This is Quote


### Code Block
```JavaScript
// For Debug
printf = function(str){
    window.alert(str);
};
// Add the processing of applications
```
### Horizon
---
### Link
https://ob-g.com/corpo/
[Objective Group](https://ob-g.com/corpo/)
![Logo](https://ob-g.com/obg_staging/wp-content/themes/obg/res/img/03_slider/top.jpg)
