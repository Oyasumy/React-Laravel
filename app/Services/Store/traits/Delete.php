<?php
namespace App\Services\Store\traits;

use App\Constants\AppConst;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

trait Delete
{
	/**
     * destroy list users, update is_deleted = 1
     * @author tuantl
     */
    public function delete($request)
    {
        try {
        	$user_id = Auth::id();
            $input = ['is_deleted' => AppConst::IS_DELETED];
            $listId = $request->input();

            $resData = $this->storeRepository->deleteList($listId, $input);

            return $resData;
        } catch (Exception $e) {
            return $e;
        }
    }
}