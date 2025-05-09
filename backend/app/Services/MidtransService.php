<?php

namespace App\Services;

use Midtrans\Config;
use Midtrans\Snap;

class MidtransService
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    public function createTransaction($order_id, $amount, $name)
{
    try {
        // Validate parameters
        if (empty($order_id) || $amount <= 0 || empty($name)) {
            throw new \InvalidArgumentException('Invalid transaction parameters');
        }

        $params = [
            'transaction_details' => [
                'order_id' => $order_id,
                'gross_amount' => (int)$amount, // Ensure integer
            ],
            'customer_details' => [
                'first_name' => substr($name, 0, 50), // Midtrans has length limits
                'email' => 'customer@example.com', // Required field
            ],
            'enabled_payments' => ['credit_card', 'gopay'], // Payment methods
        ];

        // \Log::info('Midtrans Request:', $params); // Debug logging

        $snapToken = Snap::getSnapToken($params);

        if (!$snapToken) {
            throw new \RuntimeException('Midtrans returned null token');
        }

        return $snapToken;
    } catch (\Exception $e) {
        // \Log::error('Midtrans Error: '.$e->getMessage());
        throw $e; // Re-throw for controller handling
    }
}
}
