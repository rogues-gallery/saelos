<?php

namespace App\Console\Commands;

use App\Company;
use App\Contact;
use App\Field;
use App\Import;
use App\Opportunity;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;

class ProcessImports extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'saelos:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process through imports.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        Import::where('processed', 0)->chunk(10, function($imports) {
            $imports->each(function(Import $import) {
                $rows = 0;

                if (($handle = fopen(storage_path(sprintf('/imports/%s', $import->filename)), 'r')) !== false) {
                    $headers = collect(fgetcsv($handle));
                    $fields = collect($import->field_mapping);
                    $model = $import->entity_type;
                    $knownFields = Field::where('model', $model)->get();

                    while(($data = fgetcsv($handle, 100)) !== false) {
                        $columns = $headers->mapWithKeys(function ($header, $key) use ($data, $fields) {
                            return [$fields[$header] => $data[$key]];
                        });

                        if ($columns->keys()->contains('email')) {
                            $entity = $model::firstOrNew([
                                'email' => $columns['email']
                            ]);
                        } else {
                            $entity = new $model;
                        }

                        // Set protected fields direct to the entity
                        $columns
                            ->filter(function($value, $column) use ($knownFields) {
                                return $knownFields
                                    ->where('protected', 1)
                                    ->pluck('alias')
                                    ->contains($column);
                            })->each(function ($value, $key) use ($entity) {
                                $entity->$key = $value;
                            });
                        
                        $entity->save();

                        // Set custom fields using the HasCustomFieldsTrait
                        $columns
                            ->filter(function($value, $column) use ($knownFields) {
                                return $knownFields
                                    ->where('protected', 0)
                                    ->pluck('alias')
                                    ->contains($column);
                            })
                            ->each(function ($value, $key) use ($entity) {
                                $entity->setCustomFieldValue($key, $value);
                            });

                        $rows++;
                    }
                } else {
                    $import->errors[] = 'Could not read import file.';
                }

                $import->processed = 1;
                $import->rows = $rows;

                $import->save();
            });
        });
    }
}
