<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_header_id',
        'product_id',
        'qty',
        'price'
    ];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function transactionHeader() {
        return $this->belongsTo(TransactionHeader::class);
    }
}
