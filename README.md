# ボランティアサークル情報整理アプリ

## 概要
LINEに共有される様々なサークル情報を自動取得し、分かりやすく整理して表示するアプリです。  
活動のスケジュールを管理しやすくするために、カレンダー機能も備えています。  

## 背景
私の所属するボランティアサークルでは、LINEを通じて様々な連絡（活動の募集、お知らせ、アンケートなど）が行われていますが、サークル員から以下のような声が上がっていました。:
- 「募集が多すぎて、現在どの活動が募集されているかわからない」
- 「情報が多すぎて、管理が難しい」

これらの課題を解決するため、LINE上で共有された活動募集情報を**自動で取得**し、整理して表示するアプリを作成しました。**カレンダー機能**も加え、活動スケジュールの把握が容易になります。

---

## 工夫した点

### プロダクト面

**必要な情報のみを表示**  
-現在募集されている情報のみを表示することで、情報の整理が容易になり、不要な情報で画面が見にくくなることを防ぎます。-

- <span style="font-size: 14px;">**リマインド機能**</span>  
  <span style="font-size: 5px;">締め切りが近づいた際に、デザインを変更して視覚的に強調することで、サークル員に注意を促します。</span>

- <span style="font-size: 14px;">**情報の分類**</span>  
  <span style="font-size: 5px;">募集情報と連絡情報を**2つのカテゴリ**に分けて表示することで、目的に応じた情報をすぐに確認できるようにしています。</span>

### 技術面

- <span style="font-size: 14px;">**生成AIの活用**</span>  
  <span style="font-size: 5px;">LINEに送られるメッセージはフォーマットが一定ではないため、**生成AI**を使用して必要な情報を自動で抽出するようにしました。</span>

- <span style="font-size: 14px;">**レンダリング方法の使い分け**</span>  
  <span style="font-size: 5px;">情報の更新頻度に基づき、**SSR**と**SSG**を使い分けることで、パフォーマンスとUXを両立しています。</span>

- <span style="font-size: 14px;">**バッチ処理**</span>  
  <span style="font-size: 5px;">締め切り日を基に、募集状況を「**募集中**」「**締め切り間近**」「**終了**」に自動更新し、必要な情報のみを表示します。この処理はリマインド機能にも活用されています。</span>



---

## 技術構成
- **フロントエンド**: Next.js
- **データベース**: Prisma（PostgreSQL）

## 使い方
1. **LINEで共有されたサークル情報**が自動的にアプリに取得されます。
2. **カレンダー機能**で募集活動のスケジュールを確認できます。
3. 締め切りが近づくと、募集情報が強調表示されます。

[アプリはこちら](https://asuvid.vercel.app/)
