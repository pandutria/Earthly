<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'role',
        'username',
        'password',
        'fullname',
    ];

    protected $hidden = [
        'password',
    ];

    public function transactionHeaders() {
        return $this->hashmany(TransactionHeader::class);
    }
}
