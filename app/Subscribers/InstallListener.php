<?php

namespace App\Subscribers;

use Artisan;
use DB;
use File;
use App\User;
use App\Role;
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

        try {
            Artisan::call('passport:install', ['--force' => true], $output);

            $passwordClient = DB::table('oauth_clients')
                ->select(['id', 'secret'])
                ->where('password_client', 1)
                ->first();

            $envContent = "\n";
            $envContent .= "PASSWORD_CLIENT_ID=".$passwordClient->id."\n";
            $envContent .= "PASSWORD_CLIENT_SECRET=".$passwordClient->secret."\n";

            file_put_contents(base_path('.env'), $envContent, FILE_APPEND);

            if (File::exists(storage_path('install.json'))) {
                $info = json_decode(File::get(storage_path('install.json')), true);
                $user = User::create($info);

                $user->roles()->sync(Role::all()->pluck('id')->toArray());

                File::delete(storage_path('install.json'));
            }
        } catch (\Exception $e) {
            var_dump($e->getMessage());die;
        }
    }
}
