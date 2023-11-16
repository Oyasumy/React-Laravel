<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Eloquents\UserRepository;
use App\Repositories\Interfaces\UserInterface;
use App\Repositories\Eloquents\StoreRepository;
use App\Repositories\Interfaces\StoreInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {

        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(StoreInterface::class, StoreRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
