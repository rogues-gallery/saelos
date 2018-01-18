<?php

namespace App\Events;

use App\Note;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NoteAdded implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var Note
     */
    private $note;

    /**
     * NoteAdded constructor.
     *
     * @param Note $note
     */
    public function __construct(Note $note)
    {
        $this->note = $note;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('notes');
    }

    /**
     * @return array
     */
    public function broadcastWith()
    {
        return $this->note->load('user')->toArray();
    }
}
