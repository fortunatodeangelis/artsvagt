<?php

namespace App\Services;

use GuzzleHttp\Client;

class IucnRedListService
{
    CONST VERSION_API = 'v3';
    CONST URL = 'https://apiv3.iucnredlist.org/api/';
    // Token sample for test
    CONST TOKEN = '9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee';
    CONST MAX_RESULTS_PER_PAGE = 10000; // Max results per page as per API documentation

    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'verify' => false,
            'base_uri' => self::URL . self::VERSION_API . '/',
        ]);
    }

    /**
     * Get all regions
     * @return array
     */
    public function getRegions(): array
    {
        $response = $this->client->request('GET', 'region/list', [
            'query' => [
                'token' => self::TOKEN,
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }

    /**
     * Get number of pages for a specific region
     * @param string $region
     * @return int
     */
    public function getNumPageForRegionalAssessments(string $region): int
    {
        $response = $this->client->request('GET', 'speciescount/region/' . $region, [
            'query' => [
                'token' => self::TOKEN,
            ],
        ]);
        $result =  json_decode($response->getBody()->getContents(), true);
        return (int) ceil($result['count'] / self::MAX_RESULTS_PER_PAGE);
    }

    /**
     * Get all species for a specific region
     * @param string $region
     * @return array
     */
    public function getAllSpeciesByRegion(string $region): array
    {
        $numPages = $this->getNumPageForRegionalAssessments($region);
        $species = [];
        for ($i = 0; $i < $numPages; $i++) {
            $response = $this->client->request('GET', 'species/region/' . $region . '/page/' . $i, [
                'query' => [
                    'token' => self::TOKEN,
                ],
            ]);
            $result = json_decode($response->getBody()->getContents(), true);
            $species = array_merge($species, $result['result']);
        }
        return $species;
    }

    /**
     * Get pagination for a specific region
     * @param string $region
     * @param int $page
     * @return array
     */
    public function getSpeciesByRegion(string $region, int $page = 0): array
    {
        // Get number of pages for a specific region
        $numPages = $this->getNumPageForRegionalAssessments($region);

        // Check if page is valid
        if ($page < 0 || $page >= $numPages) {
            return [];
        }

        // Get species for a specific region
        $response = $this->client->request('GET', 'species/region/' . $region . '/page/' . $page, [
            'query' => [
                'token' => self::TOKEN,
            ],
        ]);

        // insert max pages and current page in result
        $result = json_decode($response->getBody()->getContents(), true);
        $result['max_pages'] = $numPages;
        $result['current_page'] = $page;

        return $result;
    }
}
