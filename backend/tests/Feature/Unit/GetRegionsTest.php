<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Region;

class GetRegionsTest extends TestCase
{
    public function testGetRegions(): void {
        // Send a GET request to /api/regions.
        $response = $this->get('/api/regions');

        // Assert that the response status code is 200.
        $response->assertOk();

        // Assert that the response contains the 5 regions.
        $response->assertJson(Region::all()->toArray());
    }
}
