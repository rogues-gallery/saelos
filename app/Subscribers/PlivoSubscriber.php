<?php

namespace App\Subscribers;

use App\Activity;
use App\CallActivity;
use App\Person;
use App\User;
use Treblig\Plivo\Laravel\Events\CallAnswered;
use Treblig\Plivo\Laravel\Events\CallEnded;
use Treblig\Plivo\Laravel\Events\CallInitiated;
use Treblig\Plivo\Laravel\Events\RecordingReceived;

/**
 * Class PlivoSubscriber
 *
 * @TODO Handle inbound calls
 *
 * @package App\Subscribers
 */
class PlivoSubscriber
{
    public function subscribe($events)
    {
        $events->listen(
            CallAnswered::class,
            'App\Subscribers\PlivoSubscriber@onCallAnswered'
        );

        $events->listen(
            CallEnded::class,
            'App\Subscribers\PlivoSubscriber@onCallEnded'
        );

        $events->listen(
            CallInitiated::class,
            'App\Subscribers\PlivoSubscriber@onCallInitiated'
        );

        $events->listen(
            RecordingReceived::class,
            'App\Subscribers\PlivoSubscriber@onRecordingReceived'
        );
    }

    /**
     * @param CallAnswered $event
     */
    public function onCallAnswered(CallAnswered $event)
    {
        $call = $event->getCall();
        $person = Person::findOrFail($call->getEntityId());
        $user = User::where('phone', '=', $call->getTo())->first();
        $details = CallActivity::where('uuid', '=', $call->getCallUuid())->first();

        $details->details = json_encode($call->toArray());
        $details->status = $call->getCallStatus();

        $details->save();

        $recordingReceivedUrl = route('plivo.webhook.receive', ['id' => $call->getEntityId()]);
        $response = <<<XML
<?xml version="1.0" encoding="UTF-8" ?>
<Response>
    <Record action="{$recordingReceivedUrl}" startOnDialAnswer="true" redirect="false" maxLength="1200" />
    <Dial callerId="{$call->getTo()}" callerName="{$user->name}">
        <Number>{$person->phone}</Number>    
    </Dial>
</Response>
XML;

        $event->setResponseXml($response);
    }

    /**
     *
     * @param CallEnded $event
     */
    public function onCallEnded(CallEnded $event)
    {
        $call = $event->getCall();
        /** @var CallActivity $details */
        $details = CallActivity::where('uuid', '=', $call->getCallUuid())->with('activity')->first();

        $details->details = array_merge(json_decode($details->details, true) ?? [], $call->toArray());
        $details->status = $call->getCallStatus();
        $details->end_date = new \DateTime();

        $details->activity()->update(['completed' => 1]);

        $details->save();
    }

    /**
     * @param CallInitiated $event
     */
    public function onCallInitiated(CallInitiated $event)
    {
        $call = $event->getCall();
        $person = Person::findOrFail($call->getEntityId());
        $user = User::where('phone', '=', $event->getCallArgs()['to'])->first();

        $activity = new Activity();
        $activity->title = 'Phone call placed.';
        $activity->description = sprintf(
            'Call to %s %s initiated by %s.',
            $person->first_name,
            $person->last_name,
            $user->name
        );

        $details = new CallActivity();

        $details->uuid = $call->getRequestUuid();
        $details->details = json_encode($call->toArray());
        $details->status = $call->getMessage();
        $details->start_date = new \DateTime();

        $details->save();

        $activity->details()->associate($details);
        $activity->entity()->associate($person);
        $activity->save();
    }

    /**
     * @param RecordingReceived $event
     */
    public function onRecordingReceived(RecordingReceived $event)
    {
        $call = $event->getCall();
        $details = CallActivity::where('uuid', '=', $call->getCallUuid())->first();

        $details->details = array_merge(json_decode($details->details, true), $call->toArray());
        $details->status = $call->getCallStatus();

        $details->save();
    }
}