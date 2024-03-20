<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $table = 'tickets';

    protected $fillable = [
        'Status',
        'UserId',
        'ProductId',
        'ProductName',
        'TotalPrice',
        'AmountOfPeople',
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
