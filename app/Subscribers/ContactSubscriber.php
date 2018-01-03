<?php

namespace App\Subscribers;

use App\Activity;
use App\CallActivity;
use App\EmailActivity;
use App\Events\ContactEmailed;
use App\Person;
use App\User;
use Treblig\Plivo\Laravel\Events\CallAnswered;
use Treblig\Plivo\Laravel\Events\CallEnded;
use Treblig\Plivo\Laravel\Events\CallInitiated;
use Treblig\Plivo\Laravel\Events\RecordingReceived;

/**
 * Class ContactSubscriber
 *
 * @package App\Subscribers
 */
class ContactSubscriber
{
    public function subscribe($events)
    {
        $events->listen(
            ContactEmailed::class,
            __CLASS__.'@onContactEmailed'
        );
    }

    public function onContactEmailed(ContactEmailed $event)
    {
        $person = $event->getPerson();
        $user = $event->getUser();

        $activity = new Activity();
        $activity->title = 'Email sent.';
        $activity->description = sprintf(
            'Email to %s %s sent by %s.',
            $person->first_name,
            $person->last_name,
            $user->name
        );

        $details = new EmailActivity();
        $details->content = '';
        $details->details = json_encode([]);

        $details->save();

        $activity->details()->associate($details);
        $activity->entity()->associate($person);
        $activity->save();
    }
}