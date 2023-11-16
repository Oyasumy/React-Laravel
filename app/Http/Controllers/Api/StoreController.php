<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Api\Store\AddStoreRequest;
use App\Http\Requests\Api\Store\EditStoreRequest;
use App\Http\Responses\BaseHttpResponse;
use App\Repositories\Controllers\BaseController;
use App\Services\Store\StoreService;
use Exception;
use Illuminate\Http\Request;

class StoreController extends BaseController
{
    protected $storeService;

    public function __construct(StoreService $storeService)
    {
        $this->storeService = $storeService;
    }

    /**
     * Get list store by keyword
     *
     * @param Request $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function index(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->storeService->list($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * Add new store
     *
     * @param AddStoreRequest $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function create(AddStoreRequest $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->storeService->create($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * show update store by id
     *
     * @param Request $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function show(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->storeService->show($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * update store by id
     *
     * @param EditStoreRequest $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function update(EditStoreRequest $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->storeService->update($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * approve store by id
     *
     * @param Request $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function approve(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->storeService->approve($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * Delete store by ids
     *
     * @param Request $request
     * @author tuantl
     * @return BaseHttpResponse $response
     */
    public function delete(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->storeService->delete($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * get data to create store
     *
     * @param Request $request
     * @return BaseHttpResponse $response
     * @author tuantl
     */
    public function getDataCreate(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->storeService->getDataCreate($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }

    /**
     * get postal code
     *
     * @param Request $request
     * @return BaseHttpResponse $response
     * @author tuantl
     */
    public function getPostalCode(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->storeService->getPostalCode($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }
}
