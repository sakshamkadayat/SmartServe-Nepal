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
        Schema::create('poll_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poll_id')->constrained('polls','id')->onDelete('cascade');
            $table->foreignId('poll_option_id')->constrained('poll_options','id')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users','id');
            $table->string('status')->default('not_voted');  //voted
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('poll_votes');
    }
};
