<?php

namespace App\Repositories\Eloquents;

use App\Constants\AppConst;
use App\Models\TStore;
use App\Models\TImage;
use App\Models\MCategory;
use App\Models\MPostalCode;
use App\Repositories\Interfaces\StoreInterface;
use Exception;
use Illuminate\Support\Facades\Password;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use File;
use UtilsHelper;

class StoreRepository extends RepositoriesAbstract implements StoreInterface
{
    public function getModel()
    {
        return TStore::class;
    }

    public function index($request): LengthAwarePaginator
    {
        $conditions = [];
        $sizePage = AppConst::SIZE_PAGE_LIST_STORES;
        $sortType = 'asc';
        $sort = 'name';
        if ($request->has('size')) {
            $sizePage = $request->get('size');
        }
        if ($request->has('keyword') && ($request->get('keyword') != '' && $request->get('keyword') != null)) {
            array_push($conditions, ['t_store.name', 'like', '%' . $request->get('keyword') . '%']);
        }
        if ($request->has('category') && ($request->get('category') != '' && $request->get('category') != null)) {
            array_push($conditions, ['category_id', '=', $request->get('category')]);
        }
        if ($request->has('postal_code') && ($request->get('postal_code') != '' && $request->get('postal_code') != null)) {
            array_push($conditions, ['postal_code_id', '=', $request->get('postal_code')]);
        }
        if ($request->has('sort_type') && ($request->get('sort_type') != '' && $request->get('sort_type') != null)) {
            $sortType = $request->get('sort_type');
        }
        if ($request->has('sort') && ($request->get('sort') != '' && $request->get('sort') != null)) {
            $sort = $request->get('sort');
        }
        $query = $this->model::select(
            'id',
            'name',
            'address',
            'phone',
            'url',
            'comment',
            'category_id',
            'postal_code_id',
            'is_public',
        )
        ->with(
            [
                'images',
                'category',
                'postalcode'
            ]
        )
            ->where('t_store.is_deleted', AppConst::IS_NOT_DELETED);
        if (!empty($conditions)) {
            $query->where($conditions);
        }

        $query->orderBy($sort, $sortType);
        return $query->paginate($sizePage);
    }

    public function show($id)
    {
        return $query = $this->model::select(
            'id',
            'name',
            'address',
            'phone',
            'url',
            'comment',
            'category_id',
            'postal_code_id',
            'is_public',
        )
        ->with(
            [
                'images',
                'category',
                'postalcode'
            ]
        )->findOrFail($id);
    }

    public function getListCategory($request)
    {
        return MCategory::select('id', 'name')->get()->toArray();
    }

    public function getListPostalCode($request)
    {
        $type = AppConst::POSTAL_CODE_PREFECTURE;
        $value = "";
        if ($request->has('type') && ($request->get('type') != '' && $request->get('type') != null)) {
            $type = $request->get('type');
        }
        if ($request->has('value') && ($request->get('value') != '' && $request->get('value') != null)) {
            $value = $request->get('value');
        }
        $result = '';
        switch ($type) {
            case AppConst::POSTAL_CODE_CITY:
                $result = MPostalCode::where('prefecture_kanji', "=", $value)->distinct()->get(['city_kanji']);
                break;
            case AppConst::POSTAL_CODE_TOWN:
                $result = MPostalCode::where('city_kanji', "=", $value)->select('id', 'town_kanji')->get();
                break;
            default:
                $result = MPostalCode::distinct()->get(['prefecture_kanji']);
                break;
        }
        return $result;
    }

    /**
     * upload image
     * @author tuantl
     */
    public function uploadImage($file, $storeId)
    {
        $name = $file->getClientOriginalName();
        $array = explode('.', $name);
        $extension = end($array);
        $randomString = UtilsHelper::generateRandomString();
        $fileName = $storeId . '-' . $randomString . '.' . $extension;
        $dstPath = public_path(AppConst::PATH_STORE_IMAGE);
        if (!File::exists($dstPath)) {
            File::makeDirectory($dstPath, $mode = 0777, true, true);
        }
        $file->move($dstPath, $fileName);
        return $fileName;
    }

    /**
     * remove image 
     * @author tuantl
     */
    public function removeImage($fileName)
    {
        $dstPath = public_path(AppConst::PATH_STORE_IMAGE) . $fileName;
        if (File::exists($dstPath)) {
            unlink($dstPath);
        }
    }

    /**
     * create image
     * @author tuantl
     */
    public function createImage(array $data)
    {
        return TImage::create($data);
    }

    /**
     * update image
     * @author tuantl
     */
    public function updateImage($id, array $data)
    {
        return TImage::where('id', $id)->update($data);
    }

    /**
     * delete image
     * @author tuantl
     */
    public function deleteImage($imageId)
    {
        $image = TImage::find($imageId);
        if (isset($image)) {
            $this->removeImage($image->file_name);
            $image->delete();
        }
    }
}