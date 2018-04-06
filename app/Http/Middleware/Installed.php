<?php

namespace App\Http\Middleware;

use Closure;

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
        if (!file_exists(base_path('.env'))) {
            return redirect()->to(route('LaravelInstaller::welcome'));
        }

        return $next($request);
    }
}
