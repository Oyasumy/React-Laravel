<?php
namespace App\Services\Store\traits;

use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Constants\AppConst;

trait Create
{
	/**
     * add new store
     * @author tuantl
     */
	public function create($request)
    {
        $data = $request->input();
        $user_id = Auth::id();

        try {
        	DB::beginTransaction();

        	// create store
	        $input_store = ['name' => $data['name'], 'category_id' => $data['category_id'], 'postal_code_id' => $data['postal_code_id'], 'update_user_id' => $user_id, 'employee_id' => $user_id];
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
	        $store = $this->storeRepository->create($input_store);

	        $storeId = $store->id;
	        // upload images
	        $imageFiles = $request->file('images');
	        if (isset($imageFiles) && isset($data['images'])) {
	        	foreach ($data['images'] as $index => $image) {
	        		if (isset($imageFiles[$index]['file'])) {
	        			$fileName = $this->storeRepository->uploadImage($imageFiles[$index]['file'], $storeId);
			        	$input_image = ['file_name' => $fileName, 'priority' => $image['priority'], 'store_id' => $storeId];
			        	$this->storeRepository->createImage($input_image);
	        		}
		        }
	        }
	        
	        DB::commit();
	        return $store;
        } catch (Exception $e) {
            DB::rollback();
            dd($e);
            return $e;
        }
    }
}