<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\CardList;

class ListController extends SecureController
{

    public function index() {
        return CardList::with("cards")->with("cards.members")->get();
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required',
            'x' => 'required|numeric',
            'y' => 'required|numeric'
        ]);
        return CardList::create($request->only(['title', 'x', 'y']));
    }

    public function update(Request $request, $id) {
        $list = CardList::findOrFail($id);
        $list->update($request->all());
        return $list;
    }

    public function delete(Request $request, $id) {
        CardList::find($id)->delete();
        return 204;
    }
}

