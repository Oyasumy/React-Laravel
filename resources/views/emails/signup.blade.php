<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ウェルカムメール</title>
</head>
<body>
    <h1>あなたのアカウントが作成されました</h1>
    <p>【名前】</p>
    <p>{{ $mailData['name'] }}</p>
    <p>【メールアドレス】</p>
    <p>{{ $mailData['email'] }}</p>
    <p>【仮パスワード】</p>
    <p>{{ $mailData['password'] }}</p>
    <p>【リンクウェブサイト】</p>
    <p>{{ $mailData['url'] }}</p>
</body>
</html>