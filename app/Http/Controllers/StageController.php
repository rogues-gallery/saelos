<?php

namespace App\Http\Controllers;

use App\Http\Resources\StageCollection;
use App\Stage;
use Illuminate\Http\Request;
use App\Http\Resources\Stage as StageResource;

class StageController extends Controller
{
    const INDEX_WITH = [
        'opportunities',
    ];

    const SHOW_WITH = [
        'opportunities',
    ];

    public function index()
    {
        return new StageCollection(Stage::with(static::INDEX_WITH)->paginate());
    }

    public function show($id)
    {
        return new StageResource(Stage::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        if ($request->input('action') == 'restore'
          && Stage::onlyTrashed()->where('id', $id)->restore()) {
              $stage = Stage::findOrFail($id);
              return $this->show($stage->id);
        }

        $stage = Stage::findOrFail($id);
        $data = $request->all();

        $stage->update($data);

        return $stage;
    }

    public function store(Request $request)
    {
        return Stage::create($request->all());
    }

    public function destroy($id)
    {
        Stage::findOrFail($id)->delete();

        return '';
    }

    public function pipeline(Request $request)
    {
        return new StageCollection(Stage::all());
    }
}
