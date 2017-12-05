<?php

namespace App\Http\Controllers;

use App\Stage;
use Illuminate\Http\Request;
use App\Http\Resources\Stage as StageResource;

class StageController extends Controller
{
    public function show($id)
    {
        return new StageResource(Stage::with(['deals', 'userDeals', 'teamDeals'])->find($id));
    }
}
