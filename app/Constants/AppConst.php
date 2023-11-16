<?php

namespace App\Constants;

class AppConst
{
    // status
    const IS_DELETED = 1;
    const IS_NOT_DELETED = 0;
    const IS_VALIDITY = 1;
    const IS_NOT_VALIDITY = 0;
    const IS_PUBLIC = 1;
    const IS_NOT_PUBLIC = 0;

    // role
    const ROLE_ADMIN = "admin";
    const ROLE_LC = "lc";
    const ROLE_CUSTOMER = "customer";

    // limit paging
    const SIZE_PAGE_LIST_USERS = 10;
    const SIZE_PAGE_LIST_STORES = 10;

    // email
    const STATUS_INVALID_EMAIL = "invalid_email";

    // path
    const PATH_STORE_IMAGE = "media/images/";

    // type postal code
    const POSTAL_CODE_PREFECTURE = "prefecture";
    const POSTAL_CODE_CITY = "city";
    const POSTAL_CODE_TOWN = "town";
}
