<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Species;

class GetSpeciesByRegion extends Controller
{

    const PER_PAGE = 15;

    /**
     * Get species by region.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'region' => 'required|string',
            'page' => 'integer',
            'category' => 'string',
            'class' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $region = $request->input('region');

        // Get the page number.
        $page = $request->input('page') ?? 1;

        $species = Species::where('regions_identifier', $region);

        // If category is set, filter by category.
        if ($request->has('category') && $request->input('category') !== 'all') {
            $category = $request->input('category');
            $species = $species->where('category', $category);
        }

        // If class is set, filter by class.
        if ($request->has('class') && $request->input('class') !== 'all') {
            $class = $request->input('class');
            $species = $species->where('class_name', $class);
        }

        // Get the number of pages.
        $count = $species->count();
        $pages = ceil($count / self::PER_PAGE);

        $species = $species->skip(($page - 1) * self::PER_PAGE)->take(self::PER_PAGE)->get();

        // If no species found, return 404.
        if ($species->isEmpty()) {
            return response()->json(['message' => 'No species found for this region.'], 404);
        }

        // Return the species and the number of pages.
        return response()->json([
            'species' => $species,
            'pages' => $pages,
            'count' => $count,
            'currentPage' => $page
        ]);
    }
}
