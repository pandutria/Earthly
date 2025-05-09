<?php

namespace App\Services;

use Midtrans\Snap;
use Midtrans\Transaction;

class MidtransService
{
    public function __construct()
    {
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        \Midtrans\Config::$clientKey = env('MIDTRANS_CLIENT_KEY');
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;
    }

    // Method untuk membuat Snap transaction
    public function createTransaction($order_id, $amount, $name)
{
    try {
        $snap_token = \Midtrans\Snap::getSnapToken([
    'transaction_details' => [
        'order_id' => 'ORDER-TEST-' . now()->timestamp,
        'gross_amount' => 100000, // pastikan lebih dari 0
    ],
    'customer_details' => [
        'first_name' => 'John Doe',
        'email' => 'john.doe@example.com',
    ],
]);

        return $snap_token;
    } catch (\Exception $e) {
        return null; // Kembalikan null jika gagal
    }
}

}
