<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Region;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $regions = [
            ["name" => "Eastern Africa", "identifier" => "eastern_africa"],
            ["name" => "Central Africa", "identifier" => "central_africa"],
            ["name" => "Northeastern Africa", "identifier" => "northeastern_africa"],
            ["name" => "Northern Africa", "identifier" => "northern_africa"],
            ["name" => "Western Africa", "identifier" => "western_africa"],
            ["name" => "Southern Africa", "identifier" => "southern_africa"],
            ["name" => "Mediterranean", "identifier" => "mediterranean"],
            ["name" => "Europe", "identifier" => "europe"],
        ];

        foreach ($regions as $region) {
            Region::create($region);
        }
    }
}
