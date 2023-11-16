<?php

namespace App\Http\Requests\Api\Users;

use Illuminate\Foundation\Http\FormRequest;

class EditUsersRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:60|min:2',
            'role_id' => 'required|numeric',
        ];
    }
    
	public function messages() {
		return [];
	}
}
