<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MCategory;
use Illuminate\Support\Facades\DB;

class MCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('m_category')->delete();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $dataCategories = ['焼肉', '寿司', '居酒屋', 'イタリアン', 'ラーメン', 'カフェ', '海鮮・魚介', 'そば（蕎麦）', 'うどん', 'うなぎ', '焼き鳥', 'とんかつ', '串揚げ', '天ぷら', 'お好み焼き', 'もんじゃ焼き', 'しゃぶしゃぶ', '沖縄料理', '洋食', 'フレンチ', 'スペイン料理', 'パスタ', 'ピザ', 'ステーキ', 'ハンバーグ', '中華料理', 'タイ料理', 'カレー', 'ホルモン', '鍋', 'もつ鍋', 'ビュッフェ・バイキング', 'パン', 'スイーツ', 'ケーキ', 'バー・お酒', '料理旅館', 'ビストロ', '食堂', '喫茶店', 'タピオカ'];
        foreach ($dataCategories as $key => $item) {
            MCategory::create(['id' => $key + 1, 'name' => $item]);
        }
        $this->command->info('M_category table seeded!');
    }
}
