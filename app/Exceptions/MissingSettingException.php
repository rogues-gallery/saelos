<?php

namespace App\Exceptions;

class MissingSettingException extends \Exception
{
    public function __construct($settingName)
    {
        parent::__construct(sprintf('Missing setting: %s', $settingName));
    }
}