<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reviews extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'review',
        'date',
    ];

   public function user() {
    return $this->belongsTo(User::class, 'user_id');
}

public function product() {
    return $this->belongsTo(Product::class, 'product_id');
}

}
