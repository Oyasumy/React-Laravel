<?php
namespace App\Services\Users\traits;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

trait Update
{
	/**
     * update user
     * @author tuantl
     */
    public function update($request)
    {
        $detailId = $request->route('id');
        $dataUpdate = [
            'name' => $request->name,
            'role_id' => $request->role_id
        ];
        $user = $this->usersRepository->updateById($detailId, $dataUpdate);
        return $user;
    }
}