<?php

namespace App\Http\Controllers;

use App\Models\TransactionHeader;
use App\Services\MidtransService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $midtransService;

    public function __construct(MidtransService $midtransService)
    {
        $this->midtransService = $midtransService;
    }

    public function getSnapToken($transactionHeaderId)
    {
        $transaction = TransactionHeader::with('user')->findOrFail($transactionHeaderId);

        $order_id = 'ORDER-' . $transaction->id . '-' . now()->timestamp;
        $gross_amount = (int) $transaction->total_price;
        $name = $transaction->user->name ?? 'Guest';

        $snap_token = $this->midtransService->createTransaction($order_id, $gross_amount, $name);

        if (!$snap_token) {
    return response()->json([
        'message' => 'Failed to generate Snap Token',
        'debug' => 'Snap token is null, mungkin karena gross_amount tidak valid, atau serverKey salah.'
    ], 500);
}

        return response()->json([
            'snapToken' => $snap_token,
            'order_id' => $order_id,
        ]);
    }
}
