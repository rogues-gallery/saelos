<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Auth;

class Contact extends Mailable
{
    use Queueable, SerializesModels;

    private $emailContent;
    private $emailSubject;

    /**
     * Contact constructor.
     *
     * @param string $content
     * @param string $subject
     */
    public function __construct(string $content, string $subject)
    {
        $this->emailContent = $content;
        $this->emailSubject = $subject;
    }

    /**
     * @return string
     */
    public function getEmailSubject(): string
    {
        return $this->emailSubject;
    }

    /**
     * @return string
     */
    public function getEmailContent(): string
    {
        return $this->emailContent;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $user = Auth::user();

        return $this->from($user->email, $user->name)
            ->view('emails.contact.default')
            ->subject($this->getEmailSubject())
            ->with([
                'content' => nl2br($this->getEmailContent()),
            ]);
    }
}
