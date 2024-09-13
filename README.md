# サークル情報整理アプリ

## 概要
ボランティア活動の募集情報をLINEから自動取得し、シンプルなUIで整理・表示するアプリです。  
活動のスケジュールを管理しやすくするために、カレンダー機能を備えています。  
**ー 自動で簡単情報整理 ー**

## 背景
私の所属するボランティアサークルでは、LINEを通じて活動の募集が行われていますが、以下の課題がありました:
- 「募集が多すぎて、現在どの活動が募集されているかわからない」
- 「情報が多すぎて、管理が難しい」

これらの課題を解決するため、LINE上で共有された活動募集情報を自動で取得し、整理してアプリ上で表示する機能を開発しました。カレンダー機能も加え、活動スケジュールの把握が容易になります。

## 主な機能・工夫
1. **シンプルなUI**: 募集情報が一目でわかるレイアウトを実現。
2. **UX向上のためのSSR/SSG活用**: パフォーマンス向上のために、サーバーサイドレンダリング（SSR）と静的サイト生成（SSG）を適切に使い分け。
3. **締め切りリマインド機能**: 締め切りが近づくとデザインを強調し、注意を促す（バッチ処理でステータスを変更）。
4. **LINEからの自動情報取得**: 既存のLINEグループの仕組みを活用し、運用の負担を軽減。

## 技術構成
- **フロントエンド**: Next.js
- **データベース**: Prisma（PostgreSQL）

## 使い方
1. LINEで共有された活動情報が自動的にアプリに取得されます。
2. カレンダー機能で募集活動のスケジュールを確認できます。
3. 締め切りが近づくと、募集情報が強調表示されます。
