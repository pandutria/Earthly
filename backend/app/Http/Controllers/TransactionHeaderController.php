<?php

namespace App\Http\Controllers;
use App\Models\TransactionHeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Midtrans\Snap;
use Midtrans\Config;

class TransactionHeaderController extends Controller
{

    public function publicIndex() {
        return TransactionHeader::with('user')->get();
    }

    public function index() {
        $user = Auth::user();

        return TransactionHeader::with('user')
            ->where('user_id', $user->id)
            ->get();

    }

    public function show($id) {
        return TransactionHeader::with('user')->find($id);
    }

    public function store(Request $request) {
        try {
            // $request->validate([
            //     'user_id' => $request->user_id,
            //     'address' => $request->address,
            //     'date' => $request->date,
            //     'total_price' => $request->total_price,
            //     'status' => $request->status,
            // ])

            $user = Auth::user();
            $th = TransactionHeader::create([

                'user_id' => $user->id,
                'address' => $request->address,
                'date' => $request->date,
                'total_price' => $request->total_price,
                'status' => $request->status,
            ]);

            $th->load('user');

             // === MIDTRANS CONFIG ===
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // === MIDTRANS TRANSACTION DATA ===
        $payload = [
            'transaction_details' => [
                'order_id' => 'ORDER-' . $th->id . '-' . time(),
                'gross_amount' => $th->total_price,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
        ];

        $snapToken = Snap::getSnapToken($payload);

        return response()->json([
            'id' => $th->id,
            'snap_token' => $snapToken,
        ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'eror' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id) {
        $th = TransactionHeader::find($id);
        $th->update($request->only('status'));

        $th->load('user');
        return response()->json($th);
    }
}
