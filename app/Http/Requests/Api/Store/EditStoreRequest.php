<?php

namespace App\Http\Requests\Api\Store;

use Illuminate\Foundation\Http\FormRequest;

class EditStoreRequest extends FormRequest
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
            'images' => 'nullable|array',
            'images.*.file' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048',
            'images.*.priority' => 'nullable|numeric'
        ];
    }

	public function messages() {
		return [];
	}
}
