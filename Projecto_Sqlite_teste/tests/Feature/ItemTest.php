<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use GuzzleHttp\Client;

class ItemTest extends TestCase
{
    protected $client;

    public function setUp(): void
    {
        parent::setUp();
        $this->client = new Client(['base_uri' => 'http://localhost:3000']);
    }

    public function testGetItems()
    {
        $response = $this->client->get('/items');
        $items = json_decode($response->getBody()->getContents(), true);

        $this->assertIsArray($items);
    }

    public function testCreateItem()
    {
        $response = $this->client->post('/items', [
            'json' => [
                'name' => 'Test Item',
                'description' => 'Test Description'
            ]
        ]);

        $item = json_decode($response->getBody()->getContents(), true);

        $this->assertArrayHasKey('id', $item);
    }

    public function testUpdateItem()
    {
        $response = $this->client->post('/items', [
            'json' => [
                'name' => 'Item to Update',
                'description' => 'Update Description'
            ]
        ]);

        $item = json_decode($response->getBody()->getContents(), true);
        $itemId = $item['id'];

        $response = $this->client->put("/items/{$itemId}", [
            'json' => [
                'name' => 'Updated Item',
                'description' => 'Updated Description'
            ]
        ]);

        $updatedItem = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(1, $updatedItem['changes']);
    }

    public function testDeleteItem()
    {
        $response = $this->client->post('/items', [
            'json' => [
                'name' => 'Item to Delete',
                'description' => 'Delete Description'
            ]
        ]);

        $item = json_decode($response->getBody()->getContents(), true);
        $itemId = $item['id'];

        $response = $this->client->delete("/items/{$itemId}");

        $deletedItem = json_decode($response->getBody()->getContents(), true);

        $this->assertEquals(1, $deletedItem['changes']);
    }
}
