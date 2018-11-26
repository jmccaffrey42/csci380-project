<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class UsersController extends SecureController
{
    public function index() {
        return User::all();
    }

    public function show($id) {
        $user = User::find($id);
        return $user;
    }

    public function update(Request $request) {
        $request->validate([
            'email' => 'email|unique:users,email'
        ]);

        $user = Auth::user();
        $user->update($request->only(['name', 'email']));

        return $user;
    }
}
