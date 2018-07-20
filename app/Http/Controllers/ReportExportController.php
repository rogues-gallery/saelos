<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * @hideFromAPIDocumentation
 */
class ReportExportController extends Controller
{
    /**
     * Export a Report as CSV
     * 
     * @param Request $request
     * @param int  $id
     * 
     * @hideFromAPIDocumentation
     *
     * @return StreamedResponse
     */
    public function export(Request $request, Report $report)
    {
        $filename = strtolower(str_replace(' ', '_', $report->name)).'.csv';

        return new StreamedResponse(function () use ($report) {
            /** @var Builder $query */
            $query = $report->data();
            $handle = fopen('php://output', 'w');

            fputcsv($handle, $report->columns);

            $query->chunk(100, function ($results) use ($report, $handle) {
                foreach ($results as $result) {
                    $row = [];
                    foreach ($report->columns as $column) {
                        if (strpos($column, '.') !== false) {
                            list($relation, $col) = explode('.', $column);

                            if ($relation === 'custom_fields') {
                                $row[$column] = $result->custom_fields[$col]['value'];
                            } else {
                                $row[$column] = $result->{$relation}[$col];
                            }
                        } else {
                            $row[$column] = $result->{$column};
                        }
                    }

                    fputcsv($handle, $row);
                }
            });

            fclose($handle);
        }, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => sprintf('attachment;filename="%s"', $filename),
            'X-Suggested-Filename' => $filename
        ]);
    }
}
