<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->delete();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        User::create(
            [
                'id' => 1,
                'email' => 'dev@sonix.com.vn',
                'name' => 'admin',
                'password' => '123123123',
                'role_id' => 1, // admin
                'is_validity' => 1
            ]
        );
        
        $this->command->info('Users table seeded!');
    }
}
