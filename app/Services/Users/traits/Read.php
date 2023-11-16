<?php

namespace App\Services\Users\traits;

use App\Constants\AppConst;

trait Read
{
	/**
     * get list users
     * @author tuantl
     */
    function list($request)
    {
    	$users = [];
        $resData = collect($this->usersRepository->index($request));
        foreach ($resData['data'] as $key => $item) {
        	$user = array();
        	$user['id'] = $item['id'];
            $user['name'] = $item['name'];
            $user['email'] = $item['email'];
            $user['role_id'] = $item['role_id'];
            $user['is_validity'] = $item['is_validity'];
            $user['role_name'] = $item['role']['name'];

        	array_push($users, $user);
        }
        $resData['data'] = $users;
        return $resData;
    }

    /**
     * get data to create user
     * @author tuantl
     */
    public function getDataCreate($request)
    {
        $resData = [];
        $resData['roles'] = $this->usersRepository->getListRoles($request);
        return $resData;
    }

    /**
     * get detail user
     * @author tuantl
     */
    public function show($request)
    {
        $detailId = $request->route('id');
        $user = $this->usersRepository->show($detailId);
        $user['role_name'] = $user['role']['name'];
        unset($user['role']);
        return $user;
    }
}