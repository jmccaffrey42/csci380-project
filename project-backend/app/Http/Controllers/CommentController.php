<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function store(Request $request) {
        return Comment::create($request->all());
    }

    public function update(Request $request, $id) {
        $list = Comment::findOrFail($id);
        $list->update($request->all());
        return $list;
    }

    public function delete(Request $request, $id) {
        Comment::find($id)->delete();
        return 204;
    }
}
