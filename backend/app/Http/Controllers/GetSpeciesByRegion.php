<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\IucnRedListService;

class GetSpeciesByRegion extends Controller
{
    public function __construct(IucnRedListService $iucnService)
    {
        $this->iucnService = $iucnService;
    }

    public function index(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'region' => 'required|string',
            'page' => 'integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Check if the region is valid
        $regions = $this->iucnService->getRegions();
        $region = $request->region;

        if (!in_array($region, array_column($regions['results'], 'identifier'))) {
            return response()->json(['error' => 'Invalid region'], 400);
        }

        $response = $this->iucnService->getSpeciesByRegion($request->region, $request->page ?? 0);

        if (empty($response)) {
            return response()->json(['error' => 'No species found'], 404);
        }

        return response()->json($response);
    }
}
