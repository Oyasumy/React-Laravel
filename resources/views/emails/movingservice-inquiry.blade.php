<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Item Sales Inquiry Mail</title>
</head>
<body>
    <h1>HPより引越しの問合せメール：</h1>
    <p>【送信時刻】</p>
	<p>{{ $mailData['time_send'] }}</p>
    <p>【名前】</p>
	<p>{{ $mailData['name'] }}</p>
    <p>【ふりがな】</p>
	<p>{{ $mailData['furigana'] }}</p>
    <p>【メールアドレス】</p>
	<p>{{ $mailData['mail_address'] }}</p>
    <p>【郵便番号】</p>
	<p>{{ $mailData['postal_code'] }}</p>
    <p>【住所】</p>
	<p>{{ $mailData['address'] }}</p>
    <p>【電話番号】</p>
	<p>{{ $mailData['phone'] }}</p>
    <p>【現在の住まいの間取り】</p>
	<p>{{ $mailData['current_house'] }}</p>
    <p>【引越し先の郵便番号】</p>
	<p>{{ $mailData['zip_code'] }}</p>
    <p>【引越し先のご住所】</p>
	<p>{{ $mailData['new_address'] }}</p>
    <p>【ご家族の人数】</p>
	<p>{{ $mailData['number_of_family_members'] }}</p>
    <p>【お引越し希望日】</p>
	<p>{{ $mailData['desired_moving_date'] }}</p>
    <p>【お見積り方法】</p>
	<p>{{ $mailData['estimate'] }}</p>
    <p>【お見積り希望日】</p>
	<p>{{ $mailData['preferred_date_for_quotation'] }}</p>
    <p>【連絡方法のご希望】</p>
	<p>{{ $mailData['contact_method'] }}</p>
</body>
</html>
