<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ItemController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client(['base_uri' => 'http://localhost:3000']);
    }

    public function index()
    {
        $response = $this->client->get('/items');
        $items = json_decode($response->getBody()->getContents(), true);
        return view('items.index', compact('items'));
    }

    public function create()
    {
        return view('items.create');
    }

    public function store(Request $request)
    {
        $response = $this->client->post('/items', [
            'json' => $request->only(['name', 'description'])
        ]);

        return redirect()->route('items.index');
    }

    public function edit($id)
    {
        $response = $this->client->get("/items/{$id}");
        $item = json_decode($response->getBody()->getContents(), true);

        return view('items.edit', compact('item'));
    }

    public function update(Request $request, $id)
    {
        $response = $this->client->put("/items/{$id}", [
            'json' => $request->only(['name', 'description'])
        ]);

        return redirect()->route('items.index');
    }

    public function destroy($id)
    {
        $response = $this->client->delete("/items/{$id}");

        return redirect()->route('items.index');
    }
}
