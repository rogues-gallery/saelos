<?php

namespace App\Contracts;

use Webklex\IMAP\Folder;

interface ConnectsToImap
{
    public function watchedFolder(): Folder;
}