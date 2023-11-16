<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>レンタルサービスより問合せメール</title>
</head>
<body>
    <h1>レンタルサービスより問合せメール：</h1>
    <p>【送信時刻】</p>
	<p>{{ $mailData['time_send'] }}</p>
    <p>【名前】</p>
	<p>{{ $mailData['name'] }}</p>
    <p>【郵便番号】</p>
	<p>{{ $mailData['postal_code'] }}</p>
    <p>【住所】</p>
	<p>{{ $mailData['address'] }}</p>
    <!-- <p>【電話番号】</p>
	<p>{{ $mailData['phone'] }}</p> -->
    <p>【お届け先】</p>
	<p>{{ $mailData['addressee'] }}</p>
    <p>【連絡方法のご希望】</p>
	<p>{{ $mailData['contact_method'] }}</p>
    <p>【利用希望日】</p>
	<p>{{ $mailData['preference_date'] }}</p>
    <p>【お問合せ内容】</p>
	<p>{{ $mailData['content'] }}</p>
</body>
</html>
