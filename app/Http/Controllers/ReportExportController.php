<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportExportController extends Controller
{
    /**
     * @param Request $request
     * @param int  $id
     *
     * @return StreamedResponse
     */
    public function export(Request $request, $id)
    {
        $report = Report::findOrFail($id);
        $filename = strtolower(str_replace(' ', '_', $report->name)).'.csv';

        return new StreamedResponse(function () use ($report) {
            /** @var Builder $query */
            $query = $report->data();
            $page = 1;
            $handle = fopen('php://output', 'w');

            fputcsv($handle, $report->columns);

            do {
                $data = $query->paginate(30, ['*'], 'page', $page);

                foreach ($data as $datum) {
                    $row = [];
                    foreach ($report->columns as $column) {
                        if (strpos($column, '.') !== false) {
                            list($relation, $col) = explode('.', $column);

                            if ($relation === 'custom_fields') {
                                $row[$column] = $datum->custom_fields[$col]['value'];
                            } else {
                                $row[$column] = $datum->{$relation}[$col];
                            }
                        } else {
                            $row[$column] = $datum->{$column};
                        }
                    }

                    fputcsv($handle, $row);
                }

                $page++;

            } while($page <= $data->lastPage());

            fclose($handle);
        }, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => sprintf('attachment;filename="%s"', $filename),
            'X-Suggested-Filename' => $filename
        ]);
    }
}
