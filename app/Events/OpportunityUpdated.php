<?php

namespace App\Events;

use App\Opportunity;
use App\Http\Controllers\OpportunityController;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Http\Resources\Opportunity as OpportunityResource;

class OpportunityUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var Opportunity
     */
    private $opportunity;

    /**
     * ContactUpdated constructor.
     *
     * @param Opportunity $opportunity
     */
    public function __construct(Opportunity $opportunity)
    {
        $this->opportunity = $opportunity;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('opportunities');
    }

    public function broadcastWith()
    {
        return (new OpportunityResource($this->opportunity->load(OpportunityController::SHOW_WITH)))->toArray(null);
    }
}
