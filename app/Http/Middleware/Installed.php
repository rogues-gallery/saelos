<?php

namespace App\Http\Middleware;


use Closure;
use File;

class Installed
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (strpos($request->path(), 'install') !== 0 && !file_exists(storage_path('installed'))) {
            File::copy(base_path('.env.example'), base_path('.env'));

            return redirect()->to(route('LaravelInstaller::welcome'));
        }

        return $next($request);
    }
}
