<?php

namespace App\Services\Store;

use App\Repositories\Interfaces\StoreInterface;
use App\Services\Store\traits\Create;
use App\Services\Store\traits\Delete;
use App\Services\Store\traits\Read;
use App\Services\Store\traits\Update;

class StoreService
{
    use Create;
    use Read;
    use Update;
    use Delete;

    public function __construct(
        protected StoreInterface $storeRepository
    ) {
    }

}
