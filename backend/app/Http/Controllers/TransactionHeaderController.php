<?php

namespace App\Http\Controllers;
use App\Models\TransactionHeader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionHeaderController extends Controller
{
    public function index() {

        return TransactionHeader::with('user')->get();
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
            return response()->json($th, 201);

        } catch (\Exception $e) {
            return response()->json([
                'eror' => $e->getMessage()
            ], 500);
        }
    }
}
