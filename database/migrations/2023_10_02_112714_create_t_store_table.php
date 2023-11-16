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
        Schema::create('t_store', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('category_id'); //FK
            $table->unsignedBigInteger('postal_code_id'); //FK
            $table->text('address')->nullable();
            $table->string('phone')->nullable();
            $table->text('url')->nullable();
            $table->text('comment')->nullable();
            $table->boolean('is_deleted')->default(0);
            $table->boolean('is_public')->default(0);
            $table->unsignedBigInteger('lc_user_id')->nullable(); //FK
            $table->unsignedBigInteger('employee_id')->nullable(); //FK
            $table->unsignedBigInteger('update_user_id')->nullable(); //FK
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();

            $table->foreign('category_id')->references('id')->on('m_category');
            $table->foreign('postal_code_id')->references('id')->on('m_postal_code');
            $table->foreign('lc_user_id')->references('id')->on('users');
            $table->foreign('employee_id')->references('id')->on('users');
            $table->foreign('update_user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('t_store');
    }
};
