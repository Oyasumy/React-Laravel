<?php

namespace App\Services\Users;

use App\Repositories\Interfaces\UserInterface;
use App\Services\Users\traits\Create;
use App\Services\Users\traits\Delete;
use App\Services\Users\traits\Read;
use App\Services\Users\traits\Update;

class UsersService
{
    use Create;
    use Read;
    use Update;
    use Delete;

    public function __construct(
        protected UserInterface $usersRepository
    ) {
    }

}
