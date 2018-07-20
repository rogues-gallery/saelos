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
    public function exportQueryBuilder(Builder $query, string $modelName)
    {
        $modelClass = array_values(array_slice(explode('\\', $modelName), -1))[0];
        $filename = strtolower(str_replace(' ', '_', $modelClass)).'.csv';

        /** @var Builder $query */
        return new StreamedResponse(function () use ($query, $modelName) {
            set_time_limit(0);

            $handle = fopen('php://output', 'w');
            $fields = Field::where('model', $modelName)
                ->orderBy('ordering', 'asc')
                ->get();

            fputcsv($handle, $fields->pluck('label')->all());
            
            $aliases = $fields->pluck('alias')->all();

            $query->chunk(100, function ($results) use ($fields, $aliases, $handle) {
                foreach ($results as $result) {
                    $row = [];

                    foreach ($aliases as $column) {
                        $field = $fields->where('alias', $column)->first();

                        if (!$field->protected) {
                            $row[$column] = $result->customFields->where('custom_field_alias', $column)->first()['value'];
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