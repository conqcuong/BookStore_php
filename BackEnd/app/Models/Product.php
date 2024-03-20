<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'thumbnail_image',
        'detail_image',
        'price',
        'quantity',
        'sold',
        'categoryId',
        'author',
        'description',
        'status',
        'isDelete',
    ];

    protected $casts = [
        'detail_image' => 'json',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $product->sold = 0; 
            $product->status = 'In stock';
        });
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId', 'id');
    }

}
