<?php

namespace App\Http\Requests\Api\Users;

use Illuminate\Foundation\Http\FormRequest;

class AddUsersRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:60|min:2',
            'email' => 'required|max:60|min:6|email|unique:users,email,'.$this->id,
            'role_id' => 'required|numeric',
        ];
    }

	public function messages() {
		return [];
	}
}
