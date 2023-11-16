<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MRole;
use Illuminate\Support\Facades\DB;
use App\Constants\AppConst;

class MRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('m_role')->delete();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $dataRoles = [AppConst::ROLE_ADMIN, AppConst::ROLE_LC, AppConst::ROLE_CUSTOMER];
        foreach ($dataRoles as $key => $item) {
            MRole::create(['id' => $key + 1, 'name' => $item]);
        }
        $this->command->info('M_role table seeded!');
    }
}
