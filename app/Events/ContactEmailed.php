<?php

namespace App\Events;

use App\Person;
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
     * @var Person
     */
    private $person;

    /**
     * @var User
     */
    private $user;

    /**
     * ContactEmailed constructor.
     *
     * @param Person $person
     * @param User   $user
     */
    public function __construct(Person $person, User $user)
    {
        $this->person = $person;
        $this->user = $user;
    }

    /**
     * @return Person
     */
    public function getPerson(): Person
    {
        return $this->person;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
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
        return $this->person->toArray();
    }
}
