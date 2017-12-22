<?php

namespace App\Events;

use App\Deal;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class DealUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var Deal
     */
    private $deal;

    /**
     * ContactUpdated constructor.
     *
     * @param Deal $deal
     */
    public function __construct(Deal $deal)
    {
        $this->deal = $deal;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('deals');
    }

    public function broadcastWith()
    {
        return $this->deal->toArray();
    }
}
