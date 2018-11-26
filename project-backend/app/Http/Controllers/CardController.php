<?php

namespace App\Http\Controllers;

use App\CardList;
use Illuminate\Http\Request;
use \App\Card;
use Illuminate\Support\Facades\Auth;

class CardController extends SecureController
{
    public function show($id) {
        $card = Card::where(['id' => $id])->with('members')->with('user')->with('comments')->first();
        if (empty($card)) {
            return 404;
        }
        return $card;
    }

    public function store(Request $request) {
        $request->validate([
            'card_list_id' => 'required',
            'title' => 'required',
            'description' => 'required',
            'sort_order' => 'required|numeric'
        ]);

        $cardReq = $request->only(['card_list_id', 'title', 'description', 'sort_order', 'labels']);
        $cardReq['user_id'] = Auth::user()->id;

        $list = CardList::find($cardReq['card_list_id']);
        if (empty($list)) {
            return 404;
        }

        return Card::create($cardReq);
    }

    public function update(Request $request, $id) {
        $card = Card::findOrFail($id);
        $card->update($request->only(['title', 'description', 'sort_order', 'labels']));
        return $card;
    }

    public function delete(Request $request, $id) {
        Card::find($id)->delete();
        return 204;
    }
}
