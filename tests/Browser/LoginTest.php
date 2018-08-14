<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class LoginTest extends DuskTestCase
{
    /**
     * @throws \Exception
     * @throws \Throwable
     */
    public function testLoginPage()
    {
        $this->browse(function (Browser $browser) {
            $browser->driver->manage()->deleteAllCookies();
            $browser
                ->visit('/')
                ->assertPathIs('/login');
        });
    }

    public function testLoginAction()
    {
        $this->browse(function (Browser $browser) {
            $browser
                ->visit('/')
                ->assertSee('Sign in');

            $browser->type('email', 'don.gilbert@mautic.com');
            $browser->type('password', 'Mautic12');

            $browser->click('button[type="submit"]');

            // Give browser time to redirect
            $browser->pause(2000);
            $browser->assertPathBeginsWith('/contacts');
        });
    }
}
