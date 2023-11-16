<?php

namespace App\Http\Requests\Api\Auth;

use Illuminate\Foundation\Http\FormRequest;

class APISignInRequest extends FormRequest {
	public function authorize(): bool {
		return true;
	}

	public function rules(): array
	{
		return [
			'email' => 'required|email|string|max:60|min:6',
			'password' => 'required|string|min:8|max:20',
		];
	}

	public function attributes() {
		return [
			'email' => 'Email',
			'password' => 'Password',
		];
	}

	public function messages() {
		return [
			'email.required' => 'メールアドレスまたはパスワードが違います。',
			'password.required' => 'メールアドレスまたはパスワードが違います。',
		];
	}
}
