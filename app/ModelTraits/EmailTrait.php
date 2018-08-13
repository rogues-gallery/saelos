<?php

namespace App\ModelTraits;

use App\Exceptions\MissingSettingException;
use Webklex\IMAP\Client;

trait EmailTrait
{
    protected function getImapClient()
    {
        $settings = $this->getSettings();

        if (! $settings->has('imap_host')) {
            throw new MissingSettingException('imap_host');
        }

        $client = new Client([
            'host' => $settings->get('imap_host'),
            'port' => $settings->get('imap_port', 993),
            'encryption' => $settings->get('imap_encryption', 'ssl'),
            'validate_cert' => $settings->get('imap_validate_cert', true),
            'username' => $settings->get('imap_username'),
            'password' => $settings->get('imap_password'),
            'protocol' => 'imap',
        ]);

        $client->connect();

        return $client;
    }

    public function getFolders()
    {
        return $this->getImapClient()->getFolders();
    }

    public function getFolderNames()
    {
        return $this->getFolders()->pluck('name');
    }

    public function getFolder($name)
    {
        return $this->getImapClient()->getFolder($name);
    }

    public function inbox()
    {
        return $this->getFolder('INBOX');
    }
}