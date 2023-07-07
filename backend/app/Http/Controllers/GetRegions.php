<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\IucnRedListService;

class GetRegions extends Controller
{
    public function __construct(IucnRedListService $iucnService)
    {
        $this->iucnService = $iucnService;
    }

    public function index()
    {
        $response = $this->iucnService->getRegions();
        return response()->json($response);
    }
}
