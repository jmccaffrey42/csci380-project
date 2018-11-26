<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends SecureController
{
    public function index() {
        return User::all();
    }

    public function show($id) {
        $user = User::find($id);
        return $user;
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique'
        ]);
        return User::create($request->only(['name', 'email']));
    }

    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->only(['name', 'email']));
        return $user;
    }
}
