<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Region;

class GetRegions extends Controller
{
    public function index()
    {
        $regions = Region::all();
        return response()->json($regions);
    }
}
