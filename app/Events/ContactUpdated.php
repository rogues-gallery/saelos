<?php

namespace App\Events;

use App\Http\Controllers\ContactController;
use App\Contact;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Http\Resources\Contact as ContactResource;

class ContactUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var Contact
     */
    private $contact;

    /**
     * ContactUpdated constructor.
     *
     * @param Contact $contact
     */
    public function __construct(Contact $contact)
    {
        $this->contact = $contact;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('contacts');
    }

    public function broadcastWith()
    {
        return (new ContactResource($this->contact->load(ContactController::SHOW_WITH)))->toArray(null);
    }
}
