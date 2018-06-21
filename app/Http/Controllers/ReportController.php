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
     * 
     * @param Report $report
     * 
     * @return ReportResource
     */
    public function show(Report $report)
    {
        $report->load(static::SHOW_WITH);

        $report->data = $report->data()->paginate();

        return new ReportResource($report);
    }

    /**
     * @hideFromAPIDocumentation
     * 
     * @param Request $request
     * @param Report  $report
     * 
     * @return Report
     */
    public function update(Request $request, Report $report)
    {
        $stage->update($request->all());

        return $stage;
    }

    /**
     * @hideFromAPIDocumentation
     * 
     * @param Request $request
     * 
     * @return Report
     */
    public function store(Request $request)
    {
        return Report::create($request->all());
    }

    /**
     * @hideFromAPIDocumentation
     * 
     * @param Report $report
     * 
     * @return string
     */
    public function destroy(Report $report)
    {
        $report->delete();

        return '';
    }
}
