<?php
namespace App\Services\Store\traits;

use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Constants\AppConst;

trait Update
{
	/**
     * update store
     * @author tuantl
     */
	public function update($request)
    {
    	$storeId = $request->route('id');
        $data = $request->input();
        $user_id = Auth::id();

        try {
        	DB::beginTransaction();

        	// udate store
	        $input_store = ['name' => $data['name'], 'category_id' => $data['category_id'], 'postal_code_id' => $data['postal_code_id'], 'update_user_id' => $user_id];
	        if (isset($data['address'])) {
	            $input_store = array_merge(
	                array('address' => $data['address']),
	                $input_store
	            );
	        }
	        if (isset($data['phone'])) {
	            $input_store = array_merge(
	                array('phone' => $data['phone']),
	                $input_store
	            );
	        }
	        if (isset($data['url'])) {
	            $input_store = array_merge(
	                array('url' => $data['url']),
	                $input_store
	            );
	        }
	        if (isset($data['comment'])) {
	            $input_store = array_merge(
	                array('comment' => $data['comment']),
	                $input_store
	            );
	        }
	        $store = $this->storeRepository->updateById($storeId, $input_store);

	        // upload images
	        $imageFiles = $request->file('images');
	        if (isset($imageFiles) && isset($data['images'])) {
	        	foreach ($data['images'] as $index => $image) {
	        		if (!isset($image['id'])) {
	        			if (isset($imageFiles[$index]['file'])) {
	        				$fileName = $this->storeRepository->uploadImage($imageFiles[$index]['file'], $storeId);
				        	$input_image = ['file_name' => $fileName, 'priority' => $image['priority'], 'store_id' => $storeId];
				        	$this->storeRepository->createImage($input_image);
	        			}
	        		} else {
	        			if (!isset($image['url_image'])) {
	        				$this->storeRepository->deleteImage($image['id']);
	        			} else {
	        				$input_image = ['priority' => $image['priority']];
	        				$this->storeRepository->updateImage($image['id'], $input_image);
	        			}
	        		}
		        }
	        }

	        DB::commit();
	        return $store;
        } catch (Exception $e) {
            DB::rollback();
            return $e;
        }
    }

    /**
     * approve store
     * @author tuantl
     */
	public function approve($request)
    {
    	$storeId = $request->route('id');
        $user_id = Auth::id();

        try {
        	// approve store
	        $input_store = ['is_public' => AppConst::IS_PUBLIC, 'update_user_id' => $user_id];
	        $store = $this->storeRepository->updateById($storeId, $input_store);
	        return $store;
        } catch (Exception $e) {
            return $e;
        }
    }
}