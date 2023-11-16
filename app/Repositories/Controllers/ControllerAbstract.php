<?php

namespace App\Repositories\Controllers;

use App\Repositories\Eloquents\RepositoriesAbstract;
use App\Repositories\Interfaces\ControllerInterface;

abstract class ControllerAbstract extends BaseController implements ControllerInterface
{
    protected $model;

    public function __construct(RepositoriesAbstract $model)
    {
        $this->model = $model;
    }

    public function pagination()
    {
        $pagination = $this->model->pagination();
        return response($pagination);
    }

    public function findById($id)
    {
        $data = $this->model->findById($id);
        return response(["data" => $data]);
    }

    public function deleteById($id)
    {
        $data = $this->model->deleteById($id);
        return response(["data" => $data]);
    }
}
