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
    private $emailCC;
    private $emailBCC;

    /**
     * Contact constructor.
     *
     * @param string $content
     * @param string $subject
     * @param string $cc
     * @param string $bcc
     */
    public function __construct(string $content, string $subject, string $cc, string $bcc)
    {
        $this->emailContent = $content;
        $this->emailSubject = $subject;
        $this->emailCC = $cc;
        $this->emailBCC = $bcc;
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
     * @return string
     */
    public function getEmailCC(): string
    {
        return $this->emailCC;
    }

    /**
     * @return string
     */
    public function getEmailBCC(): string
    {
        return $this->emailBCC;
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
            ->cc($this->getEmailCC())
            ->bcc($this->getEmailBCC())
            ->with([
                'content' => nl2br($this->getEmailContent()),
            ]);
    }
}
