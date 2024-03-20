<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = 'comments';

    protected $fillable = [
        'UserId',
        'ProductId',
        'RatingPoint',
        'Comment',
        'Likes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'UserId', 'id');
    }
    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductId', 'id');
    }
}
