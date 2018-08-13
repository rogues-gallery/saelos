<?php

namespace App\Console;

use App\Exceptions\MissingSettingException;
use App\Activity;
use App\Contact;
use App\EmailActivity;
use App\User;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Rap2hpoutre\CreateUser\Command;
use Webklex\IMAP\Message;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Command::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            User::all()->each(function (User $user) {
                try {
                    $user->inbox()->query()->since(new Carbon('-10 min'))->get()->each(function (Message $message) use ($user) {
                        $details = EmailActivity::firstOrNew([
                            'message_id' => $message->getMessageId()
                        ]);

                        // Bail if we've already recorded this message
                        if ($details->id) {
                            return false;
                        }

                        $details->content = $message->hasTextBody() ? $message->getTextBody() : $message->getHTMLBody();
                        $details->details = [];

                        $details->save();

                        $from = $message->getFrom()[0];
                        $contact = Contact::firstOrNew(['email' => $from->mail]);

                        if (! $contact->id) {
                            [$firstName, $lastName] = explode(' ', $from->personal.' ', 2);
                            $contact->first_name = trim($firstName);
                            $contact->last_name = trim($lastName);

                            $contact->user()->associate($user);

                            $contact->save();
                        }

                        $activity = Activity::create([
                            'title' => 'Email from Contact',
                            'description' => sprintf(
                                'Email from %s %s sent to %s.',
                                $contact->first_name,
                                $contact->last_name,
                                $user->name
                            ),
                            'completed' => 1,
                            'user_id' => $user->id,
                            'details_id' => $details->id,
                            'details_type' => EmailActivity::class
                        ]);
                        
                        $contact->activities()->save($activity, ['primary' => true]);
                    });
                } catch (MissingSettingException $e) {
                    // noop
                }
            });
        })->everyFiveMinutes();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
