<?php

namespace App\Http\Requests\Api\Store;

use Illuminate\Foundation\Http\FormRequest;

class AddStoreRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'category_id' => 'required|numeric',
            'postal_code_id' => 'required|numeric',
            'address' => 'nullable|string',
            'phone' => 'nullable|string',
            'url' => 'nullable|string',
            'comment' => 'nullable|string|max:1000',
            'images' => 'required|array',
            'images.*.file' => 'required|image|mimes:png,jpg,jpeg,webp|max:2048',
            'images.*.priority' => 'required|numeric'
        ];
    }

	public function messages() {
		return [];
	}
}
