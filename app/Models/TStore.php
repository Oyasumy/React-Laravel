<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MCategory;
use App\Models\MPostalCode;
use App\Models\User;
use App\Models\TImage;

class TStore extends Model {
	use HasFactory;
	protected $table = 't_store';
	protected $guarded = [];

	public function category()
    {
        return $this->belongsTo(MCategory::class, 'category_id')->select(['id', 'name']);
    }

    public function postalcode()
    {
        return $this->belongsTo(MPostalCode::class, 'postal_code_id')->select(['id', 'postal_code', 'prefecture_kanji', 'city_kanji', 'town_kanji']);
    }

    public function lc()
    {
        return $this->belongsTo(User::class, 'lc_user_id')->select(['id', 'name']);
    }

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id')->select(['id', 'name']);
    }

    public function images()
    {
        return $this->hasMany(TImage::class, 'store_id')->select(['id', 'file_name', 'priority', 'store_id'])->orderBy('priority', 'ASC');
    }
}
