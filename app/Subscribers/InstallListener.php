<?php

namespace App\Subscribers;

use App\Role;
use Artisan;
use DB;
use RachidLaasri\LaravelInstaller\Events\LaravelInstallerFinished;
use Symfony\Component\Console\Output\BufferedOutput;


/**
 * Class InstallListener
 *
 * @package App\Subscribers
 */
class InstallListener
{
    public function handle(LaravelInstallerFinished $event)
    {
        $output = new BufferedOutput;

        Role::create([
            'name' => 'admin',
            'description' => 'Admin User'
        ]);

        Role::create([
            'name' => 'manager',
            'description' => 'Manager User'
        ]);

        Role::create([
            'name' => 'user',
            'description' => 'User'
        ]);

        Artisan::call('passport:install', ['--force' => true, '--quiet' => true], $output);
        Artisan::call('passport:keys', ['--force' => true, '--quiet' => true], $output);
        Artisan::call('passport:client', [
            '--password' => true,
            '--quiet' => true,
            '--name' => 'Saelos Password Client'
        ], $output);

        $passwordClient = DB::table('oauth_clients')
            ->select(['id', 'secret'])
            ->where('name', 'Saelos Password Client')
            ->first();

        $envContent = "\n";
        $envContent .= "PASSPORT_CLIENT_ID=".$passwordClient->id."\n";
        $envContent .= "PASSPORT_CLIENT_SECRET=".$passwordClient->secret."\n";

        file_put_contents(base_path('.env'), $envContent, FILE_APPEND);
    }
}