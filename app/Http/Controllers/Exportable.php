<?php

namespace App\Http\Controllers;

use App\Field;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

trait Exportable
{
    /**
     * @param Builder $query
     * @param string $model
     */
    public function exportQueryBuilder(Builder $query, string $modelName, $additionalHeaders = [])
    {
        $modelClass = array_values(array_slice(explode('\\', $modelName), -1))[0];
        $filename = strtolower(str_replace(' ', '_', $modelClass)).'.csv';

        /** @var Builder $query */
        return new StreamedResponse(function () use ($query, $modelName, $additionalHeaders) {
            set_time_limit(0);

            $handle = fopen('php://output', 'w');
            $fields = Field::where('model', $modelName)
                ->where('export', 1)
                ->orderBy('ordering', 'asc')
                ->get();

            $headers = $fields->pluck('label')->all();
            $header = array_merge($headers, $additionalHeaders);
            fputcsv($handle, $header);

            $query->chunk(100, function ($results) use ($fields, $handle) {
                /** @var \App\Contracts\CsvExportable $result */
                $results->map(function($result) use ($fields, $handle) {
                    fputcsv($handle, $result->toCsvRow($fields));
                });
            });

            fclose($handle);
        }, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => sprintf('attachment;filename="%s"', $filename),
            'X-Suggested-Filename' => $filename
        ]);
    }
}