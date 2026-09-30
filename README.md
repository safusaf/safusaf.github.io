# 帳 — 詩・日記・写真の個人サイト

GitHub Pages で動く Jekyll サイトです。ビルドは GitHub 側が自動で行うので、
Markdown ファイルを置いて push するだけで更新できます。

## 公開までの手順

1. GitHub で新しいリポジトリを作る(例: `your-name.github.io` にすると
   ルート直下に公開される。それ以外の名前だと `https://your-name.github.io/リポジトリ名/` になる)
2. このフォルダの中身をそのリポジトリに push する
   ```
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/自分のID/リポジトリ名.git
   git push -u origin main
   ```
3. リポジトリの **Settings → Pages** で
   - Source: `Deploy from a branch`
   - Branch: `main` / `/(root)`
   を選ぶ。数分でサイトが公開される。

リポジトリ名を `/リポジトリ名/` 付きで公開する場合は、`_config.yml` に
`baseurl: "/リポジトリ名"` を追加すること。

## サイトのタイトルを変える

`_config.yml` の `title:` を書き換える(今は仮に「帳」としてある)。

## 日記を書き足す

`_posts/` の中に、ファイル名を `YYYY-MM-DD-タイトル.md` の形にして新規作成する。

```
---
title: 炭
---
ここから本文。
```

`_posts/2026-09-27-hajimari.md` が見本なので、読んだら削除してよい。

## 詩を書き足す

`_poems/` の中に `YYYY-MM-DD-タイトル.html` の形式で新規作成する
(拡張子を `.html` にするのは、改行をそのまま詩の行送りとして表示するため。
`.md` にすると Markdown が改行を詰めてしまう)。

```
---
title: 炭
date: 2026-09-28
---
一行目
二行目

連が変わるときは
空行をひとつ挟む
```

`_poems/2026-09-27-sumi.html` が見本。

## 写真を追加する

1.	photos フォルダを開く
2.	Add file →「Upload files」→ 写真を選ぶ(名前はそのままでOK)
3.	Commit changes

画像名はgithub上で変更できない。アップロード日を自動で取得し日付を判定する仕組み。

## 手元で確認したいとき(任意)

Ruby と Bundler が入っていれば、push する前に手元で見た目を確認できる。

```
bundle install
bundle exec jekyll serve
```

`http://localhost:4000` で確認できる。手元で確認しない場合はこの手順は不要で、
push するだけで GitHub 側が自動的にビルドしてくれる。

更新が反映されないとき
ブラウザには「別のファイル」として扱わせ、古いキャッシュを無視して確実に新しいCSSを読み込ませるために
今後もCSSを編集するたびに、この v=2 の数字を v=3 v=4 …と1つずつ増やしてコミットしてください。そうすれば、この「変えたのに反映されない」問題自体が今後起きなくなります。
これをコミットしたあと、一度Safariのタブを完全に閉じてから https://safusaf.github.io/ を開き直して確認してください。
