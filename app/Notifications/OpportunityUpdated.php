<?php

namespace App\Notifications;

use App\Opportunity;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class OpportunityUpdated extends Notification
{
    use Queueable;

    /**
     * @var Opportunity
     */
    private $opportunity;

    /**
     * Create a new notification instance.
     *
     * @param Opportunity $opportunity
     *
     * @return void
     */
    public function __construct(Opportunity $opportunity)
    {
        $this->opportunity = $opportunity;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast'];
    }

    /**
     * @param $notifiable
     *
     * @return BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'opportunity' => $this->toArray($notifiable),
            'message' => sprintf(
                '%s has been updated!',
                $this->opportunity->name
            ),
        ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return $this->opportunity->toArray();
    }
}
