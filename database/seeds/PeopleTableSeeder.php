<?php

use Illuminate\Database\Seeder;

class PeopleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = factory(App\User::class)->create();

        factory(App\Contact::class, 300000)->create()->each(function ($p) use ($user) {
            $p->assignee()->save($user);
        });
    }
}
