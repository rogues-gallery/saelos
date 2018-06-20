<?php

namespace App\Http\Controllers;

use App\Http\Resources\StageCollection;
use App\Stage;
use Illuminate\Http\Request;
use App\Http\Resources\Stage as StageResource;

/**
 * @resource Stages
 * 
 * Interact with Stages
 */
class StageController extends Controller
{
    const INDEX_WITH = [
        'opportunities',
    ];

    const SHOW_WITH = [
        'opportunities',
    ];

    /**
     * Fetching Stages
     * 
     * @return StageCollection
     */
    public function index()
    {
        return new StageCollection(Stage::with(static::INDEX_WITH)->paginate());
    }

    /**
     * Fetch a single Stage
     * 
     * @param int $id
     * 
     * @return StageResource
     */
    public function show($id)
    {
        return new StageResource(Stage::with(static::SHOW_WITH)->find($id));
    }

    /**
     * Update an existing Stage
     * 
     * @param Request $request
     * @param int     $id
     * 
     * @return StageResource
     */
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

        return $this->show($stage->id);
    }

    /**
     * Save a new Stage
     * 
     * @param Request $request
     * 
     * @return StageResource
     */
    public function store(Request $request)
    {
        $stage = Stage::create($request->all());

        return $this->show($stage->id);
    }

    /**
     * Delete a Stage
     * 
     * @param int $id
     * 
     * @return string
     */
    public function destroy($id)
    {
        Stage::findOrFail($id)->delete();

        return '';
    }

    /**
     * Build the Stage pipeline
     * 
     * @return StageCollection
     */
    public function pipeline()
    {
        return new StageCollection(Stage::all());
    }
}
