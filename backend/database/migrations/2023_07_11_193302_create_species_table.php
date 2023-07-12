<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('species', function (Blueprint $table) {
            $table->id();
            $table->foreign('regions_identifier')->references('identifier')->on('regions');
            $table->string('regions_identifier')->index();
            $table->integer('taxonid');
            $table->string('kingdom_name');
            $table->string('phylum_name');
            $table->string('class_name')->index();
            $table->string('order_name');
            $table->string('family_name');
            $table->string('genus_name');
            $table->string('scientific_name');
            $table->string('taxonomic_authority')->nullable();
            $table->string('infra_rank')->nullable();
            $table->string('infra_name')->nullable();
            $table->string('population')->nullable();
            $table->string('category')->index();
            $table->string('main_common_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species');
    }
};
