<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'image_url',
        'tags',
        'materials',
        'weight',
        'dimensions',
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function reviews() {
    return $this->hasMany(Reviews::class, 'product_id');
}

}
