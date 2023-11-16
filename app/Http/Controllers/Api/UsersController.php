<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Users\AddUsersRequest;
use App\Http\Requests\Api\Users\EditUsersRequest;
use App\Http\Responses\BaseHttpResponse;
use App\Repositories\Controllers\BaseController;
use App\Services\Users\UsersService;
use Exception;
use Illuminate\Http\Request;

class UsersController extends BaseController
{
    protected $usersService;

    public function __construct(UsersService $usersService)
    {
        $this->usersService = $usersService;
    }

    /**
     * Get list user by keyword
     *
     * @param Request $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function index(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->usersService->list($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * Add new user
     *
     * @param AddUsersRequest $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function create(AddUsersRequest $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->usersService->create($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * show update user by id
     *
     * @param Request $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function show(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->usersService->show($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * update user by id
     *
     * @param EditUsersRequest $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function update(EditUsersRequest $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->usersService->update($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * Delete user by ids
     *
     * @param Request $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function delete(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->usersService->delete($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * get data to create user
     *
     * @param Request $request
     * @return BaseHttpResponse $response
     * @author tuantl
     */
    public function getDataCreate(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->usersService->getDataCreate($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }
}
