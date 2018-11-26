<?php
namespace App\Http\Controllers;

use App\User;
use Illuminate\HTTP\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required'
        ]);
        $user = User::where(['email' => $request['email']])->first();
        return ['token' => $user->id];
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email'
        ]);
        return User::create($request->only(['name', 'email']));

    }
}
