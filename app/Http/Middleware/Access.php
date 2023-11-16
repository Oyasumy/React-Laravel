<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Access
{
    public function handle($request, Closure $next, ...$roles)
    {

        if (!Auth::check()) {
            abort(403, 'アクセス権限がありません。');
        }

        $user = Auth::user();

        //check role
        $role = $user->role->name;
        if (!in_array($role, $roles)) {
            abort(403, 'アクセス権限がありません。');
        }

        return $next($request);
    }
}
