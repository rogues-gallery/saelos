<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReportCollection;
use App\Report;
use Illuminate\Http\Request;
use App\Http\Resources\Report as ReportResource;

/**
 * @hideFromAPIDocumentation
 */
class ReportController extends Controller
{
    const INDEX_WITH = [
    ];

    const SHOW_WITH = [
    ];

    /**
     * @hideFromAPIDocumentation
     */
    public function index()
    {
        return new ReportCollection(Report::with(static::INDEX_WITH)->paginate());
    }

    /**
     * @hideFromAPIDocumentation
     */
    public function show($id)
    {
        $report = Report::with(static::SHOW_WITH)->find($id);

        $report->data = $report->data()->paginate();

        return new ReportResource($report);
    }

    /**
     * @hideFromAPIDocumentation
     */
    public function update(Request $request, $id)
    {
        $stage = Report::findOrFail($id);
        $data = $request->all();

        $stage->update($data);

        return $stage;
    }

    /**
     * @hideFromAPIDocumentation
     */
    public function store(Request $request)
    {
        return Report::create($request->all());
    }

    /**
     * @hideFromAPIDocumentation
     */
    public function destroy($id)
    {
        Report::findOrFail($id)->delete();

        return '';
    }
}
