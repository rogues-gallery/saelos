<?php

namespace App\Events;

use App\Company;
use App\Http\Controllers\CompanyController;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\Http\Resources\Company as CompanyResource;

class CompanyUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @var Company
     */
    private $company;

    /**
     * ContactUpdated constructor.
     *
     * @param Company $company
     */
    public function __construct(Company $company)
    {
        $this->company = $company;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('companies');
    }

    public function broadcastWith()
    {
        return (new CompanyResource($this->company->load(CompanyController::SHOW_WITH)))->toArray(null);
    }
}
