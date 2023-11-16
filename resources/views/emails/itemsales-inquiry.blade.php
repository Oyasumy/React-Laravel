<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Item Sales Inquiry Mail</title>
</head>
<body>
    <h1>物販サービスより問合せメール：</h1>
    <p>【送信時刻】</p>
    <p>{{ $mailData['time_send'] }}</p>
    <p>【名前】</p>
    <p>{{ $mailData['name'] }}</p>
    <p>【郵便番号】</p>
    <p>{{ $mailData['postal_code'] }}</p>
    <p>【住所】</p>
    <p>{{ $mailData['address'] }}</p>
    <p>【配達日】</p>
    <p>{{ $mailData['delivery_by_date'] }}</p>
    <p>【連絡方法のご希望】</p>
    <p>{{ $mailData['contact_method'] }}</p>
    <p>【お問合せ内容】</p>
	@foreach ($mailData['items'] as $item)
		<p>{{$item['text_item']}}</p>
	@endforeach
</body>
</html>
