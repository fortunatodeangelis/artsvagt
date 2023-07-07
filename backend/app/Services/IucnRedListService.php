<?php

namespace App\Services;

use GuzzleHttp\Client;

class IucnRedListService
{
    CONST VERSION_API = 'v3';
    CONST URL = 'https://apiv3.iucnredlist.org/api/';
    // Token sample for test
    CONST TOKEN = '9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee';

    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'verify' => false,
            'base_uri' => self::URL . self::VERSION_API . '/',
        ]);
    }
}
