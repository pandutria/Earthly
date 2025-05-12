<?php

namespace App\Http\Controllers;
use App\Models\Reviews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewsController extends Controller
{

    public function publicIndex() {
        return Reviews::all();
    }

    public function index(Request $request) {

        $query = Reviews::query();

        if ($request->has('product_id')) {
            $query->where('product_id', $request->input('product_id'));
        }

        return $query->with(['user', 'product'])->get();

    }

    public function show($id) {
        return Reviews::with(['user', 'product'])->find($id);
    }

    public function store(Request $request) {
        $user = Auth::user();
        $review = Reviews::create([
            'product_id' => $request->product_id,
            'user_id' => $user->id,
            'review' => $request->review,
            'date' => $request->date
        ]);

        $review->load(['product', 'user']);

        return response()->json($review, 201);
    }
}

