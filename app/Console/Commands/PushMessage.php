<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PushMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'push:message {message}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Push a message to all users of Saelos.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        \App\Events\PushMessage::broadcast($this->argument('message'));
    }
}
