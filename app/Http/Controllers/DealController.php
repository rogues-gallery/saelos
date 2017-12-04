<?php

namespace App\Http\Controllers;

use App\Deal;
use Illuminate\Http\Request;
use App\Http\Resources\Deal as DealResource;

class DealController extends Controller
{
    public function show($id)
    {
        return new DealResource(Deal::find($id));
    }
}
