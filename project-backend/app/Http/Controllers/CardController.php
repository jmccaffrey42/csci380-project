<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Card;
use Illuminate\Support\Facades\Log;

class CardController extends Controller
{
    public function show($id) {
        $cards = Card::where(['id' => $id])->with('members')->with('user')->with('comments')->get();
        if (empty($cards)) {
            return 404;
        }
        return $cards[0];
    }

    public function store(Request $request) {
        return Card::create($request->all());
    }

    public function update(Request $request, $id) {
        $list = Card::findOrFail($id);
        $list->update($request->all());
        return $list;
    }

    public function delete(Request $request, $id) {
        Card::find($id)->delete();
        return 204;
    }
}
