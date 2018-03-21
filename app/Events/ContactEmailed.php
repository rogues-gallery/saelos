<?php

namespace App\Events;

use App\Mail\Contact as ContactMail;
use App\Contact;
use App\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ContactEmailed implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var Contact
     */
    private $contact;

    /**
     * @var User
     */
    private $user;

    /**
     * @var Contact
     */
    private $email;

    /**
     * ContactEmailed constructor.
     *
     * @param Contact $contact
     * @param User    $user
     * @param Contact $email
     */
    public function __construct(Contact $contact, User $user, ContactMail $email)
    {
        $this->contact = $contact;
        $this->user = $user;
        $this->email = $email;
    }

    /**
     * @return Contact
     */
    public function getContact(): Contact
    {
        return $this->contact;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @return Contact
     */
    public function getEmail(): Contact
    {
        return $this->email;
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
        return $this->contact->toArray();
    }
}
