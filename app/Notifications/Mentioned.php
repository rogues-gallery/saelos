<?php

namespace App\Notifications;

use App\Opportunity;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class Mentioned extends Notification
{
    use Queueable;

    /**
     * @var User
     */
    private $user;

    /**
     * @var Model
     */
    private $model;

    /**
     * Mentioned constructor.
     *
     * @param User   $user
     * @param string $model
     */
    public function __construct(User $user, Model $model)
    {
        $this->user = $user;
        $this->model = $model;
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
        return new BroadcastMessage($this->toArray($notifiable));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $message = sprintf(
            '%s, you were mentioned in a note that requires your action.
             Click here when you\'re ready to address this.',
            $this->user->name
        );

        return [
            'model' => $this->model,
            'modelType' => get_class($this->model),
            'message' => $message,
            'manualDismiss' => true
        ];
    }
}
