<?php
namespace App\Services\Users\traits;

use Illuminate\Support\Facades\Mail;
use App\Mail\SignupMail;
use UtilsHelper;

trait Create
{
	/**
     * Add new user
     * @author tuantl
     */
    public function create($request)
    {
        $params = $request->input();
        $passwordTemp = UtilsHelper::generateRandomString();
        $params['password'] = $passwordTemp;
        $user = $this->usersRepository->create($params);
        $params['url'] = $request->getSchemeAndHttpHost();
        Mail::to($params['email'])->send(new SignupMail($params));
        return $user;
    }
}