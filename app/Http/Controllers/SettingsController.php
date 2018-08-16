<?php

namespace App\Http\Controllers;

use App\Contracts\ConnectsToImap;
use App\Exceptions\MissingSettingException;
use App\ModelTraits\EmailTrait;
use App\Settings;
use App\Http\Requests\StoreSettingRequest;

class SettingsController extends Controller implements ConnectsToImap
{
    use EmailTrait;

    public function store(StoreSettingRequest $request)
    {
        $data = $request->validated();
        $setting = Settings::firstOrNew(['name' => $data['name'], 'user_id' => null]);
        
        $setting->value = $data['value'];

        $setting->save();

        return $setting;
    }

    public function getSettings()
    {
        return collect(config('settings'));
    }

    /**
     * Get folder names for the IMAP connection
     */
    public function getEmailFolders()
    {
        try {
            return $this->getFolderNames()->all();
        } catch (MissingSettingException $e) {
            // noop
        }
        
        return [];
    }
}