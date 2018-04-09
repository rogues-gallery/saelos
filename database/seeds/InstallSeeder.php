<?php

use Illuminate\Database\Seeder;

use Hash;
use App\Role;
use App\User;

class InstallSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

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
    }
}
