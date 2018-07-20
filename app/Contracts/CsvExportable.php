<?php

namespace App\Contracts;

interface CsvExportable
{
    /**
     * Take the current class and transform
     * it into an array for CSV exporting.
     * 
     * @param $fields
     * 
     * @return array
     */
    public function toCsvRow($fields): array;
}