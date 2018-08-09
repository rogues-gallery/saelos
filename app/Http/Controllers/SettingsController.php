<?php

namespace App\Http\Controllers;

use App\Settings;
use App\Http\Requests\StoreSettingRequest;

class SettingsController extends Controller
{
    public function store(StoreSettingRequest $request)
    {
        $data = $request->validated();
        $setting = Settings::firstOrNew(['name' => $data['name'], 'user_id' => null]);
        
        $setting->value = $data['value'];

        $setting->save();

        return $setting;
    }
}