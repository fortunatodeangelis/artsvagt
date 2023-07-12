<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\IucnRedListService;
use App\Models\Region;
use App\Models\Species;

class FetchRedListData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-red-list-data {param}';

    private $iucnService;

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch data from the IUCN Red List API and store it in the database.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->iucnService = new IucnRedListService();
        // Get the parameter passed to the command.
        $param = $this->argument('param');

        // Check if exist function with the name of the parameter
        if (method_exists($this, $param)) {
            $this->$param();
        } else {
            $this->error('Invalid parameter.');
        }
    }

    private function storeRegions(): void
    {
        try {
            $regions = $this->iucnService->getRegions();
            $regions = $regions['results'];

            // Get first region in database
            $firstRegion = \App\Models\Region::first();

            if ($firstRegion) {
                $this->info('Removing old regions...');
                // remove all old regions with created_at <= $firstRegion->created_at
                \App\Models\Region::where('created_at', '<=', $firstRegion->created_at)->delete();
            } else {
                $this->info('Storing regions...');
            }

            foreach ($regions as $region) {
                $newRegion = new Region();
                $newRegion->identifier = $region['identifier'];
                $newRegion->name = $region['name'];
                $newRegion->save();
            }
            $this->info('Red List data fetched and stored successfully.');

        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }

    private function storeSpecies(): void
    {
        try {
            $regions = \App\Models\Region::all();

            // Check if regions exist
            if ($regions->isEmpty()) {
                $this->error('No regions found. Please run the command "php artisan app:fetch-red-list-data storeRegions" first.');
                return;
            }

            foreach ($regions as $region) {
                $this->info('Fetching species for region ' . $region->name . '...');
                $page = 0;
                $species = $this->iucnService->getAllSpeciesByRegion($region->identifier);
                $species = $species['result'];

                if (empty($species)) {
                    $this->error('No species found for region ' . $region->name . '.');
                    continue;
                }

                // Remove all species for the current region
                \App\Models\Species::where('regions_identifier', $region->identifier)->delete();

                foreach($species as $v){
                    $newSpecies = new Species();
                    $newSpecies->regions_identifier = $region->identifier;
                    $newSpecies->taxonid = $v['taxonid'];
                    $newSpecies->kingdom_name = $v['kingdom_name'];
                    $newSpecies->phylum_name = $v['phylum_name'];
                    $newSpecies->class_name = $v['class_name'];
                    $newSpecies->order_name = $v['order_name'];
                    $newSpecies->family_name = $v['family_name'];
                    $newSpecies->genus_name = $v['genus_name'];
                    $newSpecies->scientific_name = $v['scientific_name'];
                    $newSpecies->taxonomic_authority = $v['taxonomic_authority'];
                    $newSpecies->infra_rank = $v['infra_rank'];
                    $newSpecies->infra_name = $v['infra_name'];
                    $newSpecies->population = $v['population'];
                    $newSpecies->category = $v['category'];
                    $newSpecies->main_common_name = $v['main_common_name'];
                    $newSpecies->save();
                }
            }
            $this->info('Red List data fetched and stored successfully.');
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
