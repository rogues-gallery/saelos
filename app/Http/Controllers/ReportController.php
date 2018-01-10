<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReportCollection;
use App\Report;
use Illuminate\Http\Request;
use App\Http\Resources\Report as ReportResource;

class ReportController extends Controller
{
    private $indexWith = [
    ];

    private $showWith = [
    ];

    public function index()
    {
        return new ReportCollection(Report::with($this->indexWith)->paginate());
    }

    public function show($id)
    {
        return new ReportResource(Report::with($this->showWith)->find($id));
    }

    public function update(Request $request, $id)
    {
        $stage = Report::findOrFail($id);
        $data = $request->all();

        $stage->update($data);

        return $stage;
    }

    public function store(Request $request)
    {
        return Report::create($request->all());
    }

    public function destroy($id)
    {
        Report::findOrFail($id)->delete();

        return '';
    }
}
