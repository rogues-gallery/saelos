<?php

use Illuminate\Database\Seeder;

use App\Stage;

class StageSeeder extends Seeder
{
  public function run()
  {
    $coreFields = [
      [
        'name' => 'Lost',
        'probability' => 0,
        'active' => 0,
        'color' => '#607d8b'
      ],
      [
        'name' => 'Open',
        'probability' => 50,
        'active' => 1,
        'color' => '#2196f3'
      ],
      [
        'name' => 'Won',
        'probability' => 100,
        'active' => 0,
        'color' => '#4caf50'
      ],
    ];

    foreach ($coreFields as $field) {
      Stage::create($field);
    }
  }
}
