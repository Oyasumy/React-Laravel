<?php

namespace App\Repositories\Eloquents;

use App\Constants\AppConst;
use App\Models\User;
use App\Models\MRole;
use App\Repositories\Interfaces\UserInterface;
use Exception;
use Illuminate\Support\Facades\Password;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserRepository extends RepositoriesAbstract implements UserInterface
{
    public function getModel()
    {
        return User::class;
    }

    public function index($request): LengthAwarePaginator
    {
        $conditions = [];
        $sizePage = AppConst::SIZE_PAGE_LIST_USERS;
        $sortType = 'asc';
        $sort = 'name';
        if ($request->has('size')) {
            $sizePage = $request->get('size');
        }
        if ($request->has('keyword') && ($request->get('keyword') != '' && $request->get('keyword') != null)) {
            array_push($conditions, ['users.name', 'like', '%' . $request->get('keyword') . '%']);
        }
        if ($request->has('role_type') && ($request->get('role_type') != '' && $request->get('role_type') != null)) {
            array_push($conditions, ['role_id', '=', $request->get('role_type')]);
        }
        if ($request->has('sort_type') && ($request->get('sort_type') != '' && $request->get('sort_type') != null)) {
            $sortType = $request->get('sort_type');
        }
        if ($request->has('sort') && ($request->get('sort') != '' && $request->get('sort') != null)) {
            $sort = $request->get('sort');
        }
        $query = $this->model::select('id', 'name', 'email', 'role_id', 'is_validity')->with(
            [
                'role'
            ]
        )
            ->where('users.is_deleted', AppConst::IS_NOT_DELETED);
        if (!empty($conditions)) {
            $query->where($conditions);
        }

        $query->orderBy($sort, $sortType);
        return $query->paginate($sizePage);
    }

    public function getListRoles($request)
    {
        return MRole::select('id', 'name')->get()->toArray();
    }

    public function show($id)
    {
        return $this->model::select('id', 'name', 'email', 'role_id', 'is_validity')->with(
            [
                'role'
            ]
        )->findOrFail($id);
    }

    public function forgetPassword(string $email)
    {
        $user = $this->model->where('email', $email)->firstOrFail();
        if (!$user) {
            return AppConst::STATUS_INVALID_EMAIL;
        }
        $status = Password::sendResetLink(
            ['email' => $email]
        );
        return $status;
    }

    public function resetPassword($request)
    {
        $user = $this->model->where('email', $request->input('email'))->firstOrFail();
        $credentials = $request->only(
            'email',
            'password',
            'password_confirmation',
            'token'
        );
        // Do reset password
        $status = Password::reset($credentials, function ($user, $password) {
            $user->remember_token = null;
            $user->password = $password;
            $user->save();
        });
        return $status;
    }

    public function changePassword($request)
    {
        $userId = Auth::id();
        $dataUpdate = [
            'password' => Hash::make($request->password),
            'is_validity' => AppConst::IS_VALIDITY
        ];
        return $this->updateById($userId, $dataUpdate);
    }
}