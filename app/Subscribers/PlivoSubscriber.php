<?php

namespace App\Subscribers;

use App\Activity;
use App\ActivityDetails;
use App\Person;
use Treblig\Plivo\Laravel\Events\CallAnswered;
use Treblig\Plivo\Laravel\Events\RecordingReceived;

class PlivoSubscriber
{
    public function subscribe($events)
    {
        $events->listen(
            CallAnswered::class,
            'App\Subscribers\PlivoSubscriber@onCallAnswered'
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

        $activity = new Activity();
        $activity->title = 'Call';
        $activity->description = 'Phone call placed.';

        $details = new ActivityDetails();
        $details->call_uuid = $call->getCallUuid();
        $details->details = json_encode($call->toArray());
        $details->type = 'phone_call';

        $activity->entity()->associate($person);
        $activity->save();
        $activity->details()->save($details);

        $recordingReceivedUrl = route('plivo.recording.receive', ['id' => $call->getEntityId()]);

        $callerId = '18159970741';
        $callerName = 'Don Gilbert';


        $response = <<<XML
<?xml version="1.0" encoding="UTF-8" ?>
<Response>
    <Speak>As a reminder, you are about to call {$person->first_name} {$person->last_name}</Speak>
    <Record action="{$recordingReceivedUrl}" startOnDialAnswer="true" redirect="false" maxLength="1200" />
    <Dial callerId="{$callerId}" callerName="{$callerName}">
        <Number>{$person->phone}</Number>    
    </Dial>
</Response>
XML;

        $event->setResponseXml($response);
    }

    public function onRecordingReceived(RecordingReceived $event)
    {
        $recording = $event->getRecording();

        $person = Person::findOrFail($recording->getEntityId());

        $activity = new Activity();
        $activity->title = 'Recording';
        $activity->description = 'Phone recording received';

        $details = new ActivityDetails();
        $details->call_uuid = $recording->getCallUuid();
        $details->details = json_encode($recording->toArray());
        $details->type = 'recording_received';

        $activity->entity()->associate($person);
        $activity->save();
        $activity->details()->save($details);
    }
}