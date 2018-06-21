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
     * @param Stage $stage
     * 
     * @return StageResource
     */
    public function show(Stage $stage)
    {
        return new StageResource($stage->load(static::SHOW_WITH));
    }

    /**
     * Update an existing Stage
     * 
     * @param Request $request
     * @param Stage   $stage
     * 
     * @return StageResource
     */
    public function update(Request $request, Stage $stage)
    {
        if ($request->input('action') === 'restore' && $stage->restore()) {
              return $this->show($stage);
        }

        $stage->update($request->all());

        return $this->show($stage);
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

        return $this->show($stage);
    }

    /**
     * Delete a Stage
     * 
     * @param Stage $stage
     * 
     * @return string
     */
    public function destroy(Stage $stage)
    {
        $stage->delete();

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
