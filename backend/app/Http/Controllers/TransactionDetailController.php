<?php

namespace App\Http\Controllers;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;

class TransactionDetailController extends Controller
{
    public function index(Request $request) {
        $query = TransactionDetail::query();

        if ($request->has('transactionHeader')) {
            $transactionHeaderId = $request->input('transactionHeader');
            $query->where('transaction_header_id', $transactionHeaderId);
        }

        return $query->with('product.category')->get();

    }

    public function show($id) {
        $transactionDetail = TransactionDetail::with('product.category')->find($id);


    if (!$transactionDetail) {
        return response()->json(['error' => 'Transaction detail not found'], 404);
    }

    return response()->json($transactionDetail, 200);
    }

    public function store(Request $request) {
        try {
            $transactionDetail = TransactionDetail::create([
                'product_id' => $request->product_id,
                'transaction_header_id'=> $request->header_id,
                'qty'=> $request->qty,
                'price' => $request->price,

            ]);

            $transactionDetail->load('product');
            return response()->json($transactionDetail, 201);
        } catch (\Exception $e) {
            return response()->json([
                'eror' => $e->getMessage()
            ], 500);
        }
    }
}
