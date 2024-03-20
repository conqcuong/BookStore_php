<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('thumbnail_image');
            $table->decimal('price', 10, 2);
            $table->integer('quantity');
            $table->integer('sold');
            $table->string('author');
            $table->text('description');
            $table->string('status');
            $table->boolean('isDelete')->default(false);
            $table->json('detail_image');
            $table->foreignId('categoryId')->constrained('categories');
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
        Schema::dropIfExists('products');
    }
}
