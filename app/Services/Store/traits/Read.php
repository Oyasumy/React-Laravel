<?php

namespace App\Services\Store\traits;

use App\Constants\AppConst;

trait Read
{
	/**
     * get list store
     * @author tuantl
     */
    function list($request)
    {
    	$stores = [];
        $resData = collect($this->storeRepository->index($request));
        foreach ($resData['data'] as $item) {
            $store = $item;
            foreach ($store['images'] as $key => $image) {
                $store['images'][$key]['url_image'] = asset(AppConst::PATH_STORE_IMAGE) . "/" . $image['file_name'];
            }
            array_push($stores, $store);
        }
        $resData['data'] = $stores;
        return $resData;
    }

    /**
     * get data to create store
     * @author tuantl
     */
    public function getDataCreate($request)
    {
        $resData = [];
        $resData['categories'] = $this->storeRepository->getListCategory($request);
        $resData['prefectures'] = $this->storeRepository->getListPostalCode($request);
        return $resData;
    }

    /**
     * get postal code
     * @author tuantl
     */
    public function getPostalCode($request)
    {
        $resData = $this->storeRepository->getListPostalCode($request);
        return $resData;
    }

    /**
     * get detail store
     * @author tuantl
     */
    public function show($request)
    {
        $detailId = $request->route('id');
        $store = $this->storeRepository->show($detailId);
        foreach ($store['images'] as $key => $image) {
            $store['images'][$key]['url_image'] = asset(AppConst::PATH_STORE_IMAGE) . "/" . $image['file_name'];
        }
        return $store;
    }
}