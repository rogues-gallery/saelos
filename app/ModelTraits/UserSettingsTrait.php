<?php

namespace App\ModelTraits;

use App\Settings;
use Cache;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait UserSettingsTrait
{
    public function settings(): HasMany
    {
        return $this->hasMany(Settings::class);
    }

    public function getSetting(string $name, $default = null)
    {
        $value = array_get($this->getCache(), $name, $default);

        if ($tmpValue = json_decode($value, true)) {
            return $tmpValue;
        }

        return $value;
    }

    public function getSettings()
    {
        $settings = $this->getCache();

        foreach ($settings as $key => $value) {
            if ($tmpValue = json_decode($value, true)) {
                $settings[$key] = $tmpValue;
            }
        }

        return $settings;
    }

    public function setSetting(string $name, $value)
    {
        $this->storeSetting($name, $value);
        $this->setCache();
    }

    public function setSettings(array $data = [])
    {
        foreach ($data as $name => $value) {
            $this->storeSetting($name, $value);
        }

        $this->setCache();
    }

    private function storeSetting(string $name, $value)
    {
        $record = Settings::where(['user_id' => $this->id, 'name' => $name])->first();

        if ($record) {
            $record->value = $value;
            $record->save();
        } else {
            $data = new Settings(['name' => $name, 'value' => $value]);
            $this->settings()->save($data);
        }
    }

    private function getCache()
    {
        if (Cache::has('user_settings_' . $this->id)) {
            return Cache::get('user_settings_' . $this->id);
        }

        return $this->setCache();
    }

    private function setCache()
    {
        if (Cache::has('user_settings_' . $this->id)) {
            Cache::forget('user_settings_' . $this->id);
        }

        $settings = $this->settings->pluck('value','name');
        Cache::forever('user_settings_' . $this->id, $settings);

        return $this->getCache();
    }
}