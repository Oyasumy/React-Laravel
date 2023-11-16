<?php

namespace App\Http\Controllers\Api;

use App\Constants\AppConst;
use App\Http\Requests\Api\Auth\APIForgetPasswordRequest;
use App\Http\Requests\Api\Auth\APIResetPasswordRequest;
use App\Http\Requests\Api\Auth\APISignInRequest;
use App\Http\Requests\Api\Auth\APISignUpRequest;
use App\Http\Responses\BaseHttpResponse;
use App\Repositories\Controllers\BaseController;
use App\Repositories\Interfaces\UserInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Password;

class AuthController extends BaseController
{
    protected $userRepository;

    public function __construct(
        UserInterface $userRepository
    ) {
        $this->userRepository = $userRepository;
    }

    public function signin(APISignInRequest $request, BaseHttpResponse $response)
    {
        $data = array(
            'status' => 0,
        );
        if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password'),
            'is_deleted' => AppConst::IS_NOT_DELETED])) {
            $user = Auth::user();

            $data = array(
                'status' => 1,
                'access_token' => $user->createToken('AnnicamApp')->accessToken,
                'role' => $user->role->name,
                'name' => $user->name,
                'is_validity' => $user->is_validity,
            );

            return $response->setData($data);
        }
        return $response
            ->setError()
            ->setCode(401)
            ->setMessage(__('messages.signin_error'));
    }

    public function signup(APISignUpRequest $request, BaseHttpResponse $response): BaseHttpResponse
    {
        try {
            $user = $this->userRepository->create(array_merge($request->input()));

            return $response->setData($user)->setMessage(__('messages.signup_success'));
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }

    }

    public function getInfo(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        try {
            if (Auth::guard('api')->check()) {
                $user = Auth::guard('api')->user();
                $data = array(
                    'status' => 1,
                    'user' => $user,
                );

                return $response->setData($data);
            }
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setCode(403)
                ->setMessage($e->getMessage());
        }
        return $response->setError()->setCode(403)->setMessage('Unauthorized');
    }

    /**
     * Forget Password
     *
     * @param APIForgetPasswordRequest $request
     * @return BaseHttpResponse $response
     * @author tuantl
     */
    public function forget(APIForgetPasswordRequest $request, BaseHttpResponse $response): BaseHttpResponse
    {
        try {
            $status = $this->userRepository->forgetPassword($request->input('email'));
            switch ($status) {
                case Password::RESET_LINK_SENT:
                    return $response
                        ->setCode(200)
                        ->setMessage(__('messages.success'));
                case AppConst::STATUS_INVALID_EMAIL:
                    return $response
                        ->setError()
                        ->setCode(200)
                        ->setMessage(__('messages.email_invalid'));
                default:
                    return $response
                        ->setError()
                        ->setCode(200)
                        ->setMessage(__('messages.email_sended'));
            }
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
    }

    /**
     * Reset Password
     *
     * @param APIResetPasswordRequest $request
     * @return BaseHttpResponse $response
     * @author tuantl
     */
    public function reset(APIResetPasswordRequest $request, BaseHttpResponse $response): BaseHttpResponse
    {
        try {
            $status = $this->userRepository->resetPassword($request);
            switch ($status) {
                case Password::PASSWORD_RESET:
                    return $response
                        ->setCode(200)
                        ->setMessage(__('messages.success'));
                case Password::INVALID_TOKEN:
                    return $response
                        ->setError()
                        ->setCode(200)
                        ->setMessage(__('messages.token_invalid'));
                default:
                    return $response
                        ->setError()
                        ->setCode(200)
                        ->setMessage(__('messages.general_error'));
            }
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
    }

    /**
     * Change Password
     *
     * @param Request $request
     * @return BaseHttpResponse $response
     * @author tuantl
     */
    public function change(Request $request, BaseHttpResponse $response): BaseHttpResponse
    {
        $result = [];
        try {
            $result = $this->userRepository->changePassword($request);
        } catch (Exception $e) {
            return $response
                ->setError()
                ->setMessage($e->getMessage());
        }
        return $response->setData($result);
    }
}
