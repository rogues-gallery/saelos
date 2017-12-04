<?php

namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;
use App\Http\Resources\Company as CompanyResource;

class CompanyController extends Controller
{
    public function show($id)
    {
        return new CompanyResource(Company::with(['user'])->find($id));
    }
}
