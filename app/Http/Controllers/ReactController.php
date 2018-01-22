<?php

namespace App\Http\Controllers;

use App\User;

class ReactController extends Controller
{
    public function index()
    {
        if (! (\Auth::user() instanceof User)) {
            return redirect('/login');
        }

        return view('react.index');
    }
}