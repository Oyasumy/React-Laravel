<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inquiry Mail</title>
</head>
<body>
    <h1>何でも相談窓口より問合せメール：</h1>
    <p>【送信時刻】</p>
    <p>{{ $mailData['time-send'] }}</p>
    <p>【名前】</p>
    <p>{{ $mailData['name'] }}</p>
    <p>【ふりがな】</p>
    <p>{{ $mailData['furigana'] }}</p>
    <p>【メールアドレス】</p>
    <p>{{ $mailData['mail_address'] }}</p>
    <p>【郵便番号】</p>
    <p>{{ $mailData['postcode'] }}</p>
    <p>【住所】</p>
    <p>{{ $mailData['address'] }}</p>
    <p>【電話番号】</p>
    <p>{{ $mailData['phone'] }}</p>
    <p>【連絡方法のご希望】</p>
    <p>{{ $mailData['contact_method'] }}</p>
    <p>【お問合せ内容】</p>
    <p>{{ $mailData['content'] }}</p>
</body>
</html>