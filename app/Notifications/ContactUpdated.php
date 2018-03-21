<?php

namespace App\Notifications;

use App\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ContactUpdated extends Notification
{
    use Queueable;

    /**
     * @var Contact
     */
    private $contact;

    /**
     * Create a new notification instance.
     *
     * @param Contact $contact
     *
     * @return void
     */
    public function __construct(Contact $contact)
    {
        $this->contact = $contact;
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
            'contact' => $this->toArray($notifiable),
            'message' => sprintf(
                '%s %s has been updated!',
                $this->contact->first_name,
                $this->contact->last_name
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
        return $this->contact->toArray();
    }
}
