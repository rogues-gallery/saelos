<?php

namespace App\Notifications;

use App\Deal;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class DealUpdated extends Notification
{
    use Queueable;

    /**
     * @var Deal
     */
    private $deal;

    /**
     * Create a new notification instance.
     *
     * @param Deal $deal
     *
     * @return void
     */
    public function __construct(Deal $deal)
    {
        $this->deal = $deal;
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
            'deal' => $this->toArray($notifiable),
            'message' => sprintf(
                '%s has been updated!',
                $this->deal->name
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
        return $this->deal->toArray();
    }
}
