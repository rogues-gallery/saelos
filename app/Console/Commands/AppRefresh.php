<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AppRefresh extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'saelos:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Instruct Saelos users to refresh their app instance.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        \App\Events\AppRefresh::broadcast();
    }
}
