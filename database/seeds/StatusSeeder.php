<?php

use Illuminate\Database\Seeder;

use App\Status;

class StatusSeeder extends Seeder
{
    public function run()
    {
        $statuses = [
            [
                'name' => 'Cold',
                'active' => 0,
                'color' => '#2196f3',
                'ordering' => 1
            ],
            [
                'name' => 'Warm',
                'active' => 1,
                'color' => '#ff9800',
                'ordering' => 2
            ],
            [
                'name' => 'Hot',
                'active' => 0,
                'color' => '#f44336',
                'ordering' => 3
            ],
        ];

        foreach ($statuses as $status) {
            Status::create($status);
        }
    }
}
