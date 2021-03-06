<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('administrator')->nullable();
            $table->string('profile_image')->default('');
            $table->rememberToken();
            $table->timestamps();
        });
        DB::table('users')->insert
        ([
            'name' => 'testing',
            'email' => 'testing@mail.com',
            'password' => Hash::make('testingAdmin'),
            'administrator'=>1,
        ]);
        DB::table('users')->insert
        ([
            'name' => 'inquilino',
            'email' => 'inquilino@mail.com',
            'password' => Hash::make('testingInquilino'),
            'administrator'=>0,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
