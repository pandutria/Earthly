<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionHeader extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'address',
        'date',
        'total_price',
        'status'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all of the comments for the TransactionHeader
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transactionDetail() {
        return $this->hashmany(TransactionDetail::class);
    }
}
