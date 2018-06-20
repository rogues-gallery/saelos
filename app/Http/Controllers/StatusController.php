<?php

namespace App\Http\Controllers;

use App\Status;
use Illuminate\Http\Request;
use App\Http\Resources\StatusCollection;
use App\Http\Resources\Status as StatusResource;

/**
 * @resource Statuses
 * 
 * Interact with Contact statuses
 */
class StatusController extends Controller
{
    const INDEX_WITH = [
        // 'contacts',
    ];

    const SHOW_WITH = [
        // 'contacts',
    ];

    /**
     * Fetching a filtered Status list
     * 
     * @param Request $request
     * 
     * @return StatusCollection
     */
    public function index(Request $request)
    {
      $statuses = Status::with(static::INDEX_WITH);

        if ($searchString = $request->get('searchString')) {
            $statuses->where('name', 'LIKE', $searchString.'%');
        }

        $statuses->orderBy('name');

        return new StatusCollection($statuses->paginate());
    }

    /**
     * Fetch a single Status
     * 
     * @param int $id
     * 
     * @return StatusResource
     */
    public function show($id)
    {
        return new StatusResource(Status::with(static::SHOW_WITH)->find($id));
    }

    /**
     * Update an existing Status
     * 
     * @param Request $request
     * @param int     $id
     * 
     * @return StatusResource
     */
    public function update(Request $request, $id)
    {
        if (
            $request->input('action') === 'restore'
            && Status::onlyTrashed()->where('id', $id)->restore()
        ) {
              $status = Status::findOrFail($id);

              return $this->show($status->id);
        }

        $status = Status::findOrFail($id);
        $data = $request->all();

        $status->update($data);

        return $this->show($status->id);
    }

    /**
     * Save a new Status
     * 
     * @param Request $request
     * 
     * @return StatusResource
     */
    public function store(Request $request)
    {
        $status = Status::create($request->all());

        return $this->show($status->id);
    }

    /**
     * Delete a Status
     * 
     * @param int $id
     * 
     * @return string
     */
    public function destroy($id)
    {
        Status::findOrFail($id)->delete();

        return '';
    }
}
