<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'LIKE', '%'. $search . '%');
        }

        return $query->with('category')->get();
    }

    public function show($id)
    {
        return Product::with('category')->find($id);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'price' => 'required|integer',
            ]);

            $product = Product::create([
                'category_id' => $request->category_id,
                'price' => $request->price,
                'image_url' => $request->image_url,
                'tags' => $request->tags,
                'materials' => $request->materials,
                'weight'=> $request->weight,
                'dimensions' => $request->dimensions,
                'description' => $request->description,
            ]);

            $product->load('category');
            return response()->json($product, 201);

        } catch(\Exception $e) {
            return response()->json([
                'eror' => $e->getMessage()
            ], 500);
        }
    }

    public function update (Request $request, $id) {
        $product = Product::find($id);
        $product->update($request->all());

        $product->load('category');
        return response()->json($product);
    }

    public function destroy($id) {
        Product::destroy($id);
        return response()->json('Product deleted', 204);
    }
}
