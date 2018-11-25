<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\CardList;

class ListController extends Controller
{

    public function index() {
        return CardList::with("cards")->with("cards.members")->get();
    }

    public function store(Request $request) {
        return CardList::create($request->all());
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
