<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Category::withCount('product');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'LIKE', '%' . $search . '%');
        }

        return $query->get();
    }

    public function show($id)
    {
        return Category::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $category = Category::create([
                'name' => $request->name,
            ]);

            return response()->json($category, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTrace(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());

        return response()->json($category);
    }

    public function destroy($id)
    {
        Category::destroy($id);

        return response()->json(['message' => 'Category deleted']);
    }
}
