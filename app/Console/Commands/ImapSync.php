<?php

namespace App\Console\Commands;

use App\Exceptions\MissingSettingException;
use App\Activity;
use App\Contact;
use App\EmailActivity;
use App\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Webklex\IMAP\Message;

class ImapSync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'saelos:imap:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch email for each user with configured IMAP settings.';

    /**
     * Array of domains for which NOT to create contacts
     * 
     * @var Collection
     */
    protected $excludedDomains = [];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->excludedDomains = collect(explode("\n", config('settings.imap_excluded_domains', '')));
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $users = User::all();
        $bar = $this->output->createProgressBar(count($users));

        $users->each(function (User $user) use ($bar) {
            try {
                $this->importEmailsForUser($user);
            } catch (MissingSettingException $e) {
                // noop
            } finally {
                $bar->advance();
            }
        });

        $bar->finish();
        $this->line('Done!');
    }

    /**
     * Run the email sync for the given user.
     * 
     * @param User $user
     * 
     * @return void
     * @throws MissingSettingException
     */
    private function importEmailsForUser(User $user)
    {
        $user->watchedFolder()->query()->since(new Carbon('-10 min'))->get()->each(function (Message $message) use ($user) {
            $from = $message->getFrom()[0];

            if ($this->excludedDomains->contains($from['host'])) {
                return;
            }

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
    }
}
