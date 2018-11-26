<?php

namespace App\Http\Controllers;

use App\Card;
use Illuminate\Http\Request;
use App\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends SecureController
{
    public function store(Request $request) {
        $request->validate([
            'card_id' => 'required',
            'body' => 'required'
        ]);

        $commentReq = $request->only(['body', 'card_id']);
        $commentReq['user_id'] = Auth::user()->id;

        $card = Card::find($commentReq['card_id']);
        if (empty($card)) {
            return 404;
        }

        return Comment::create($commentReq);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'body' => 'required'
        ]);

        $list = Comment::findOrFail($id);
        $list->update($request->only(['body']));
        return $list;
    }

    public function delete(Request $request, $id) {
        Comment::find($id)->delete();
        return 204;
    }
}
