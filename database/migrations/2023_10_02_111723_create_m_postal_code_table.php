<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('m_postal_code', function (Blueprint $table) {
            $table->id();
            $table->string('local_goverment_code');
            $table->string('old_postal_code', 5);
            $table->string('postal_code', 7);
            $table->string('prefecture_kana');
            $table->string('city_kana');
            $table->string('town_kana');
            $table->string('prefecture_kanji');
            $table->string('city_kanji');
            $table->string('town_kanji');
            $table->integer('multiple_postal_codes');
            $table->integer('has_multiple_building_numbers');
            $table->integer('has_chome');
            $table->integer('multiple_town_areas');
            $table->integer('update_status');
            $table->integer('change_reason');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('m_postal_code');
    }
};
