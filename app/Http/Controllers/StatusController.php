<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStatusRequest;
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
     * @param Status $status
     * 
     * @return StatusResource
     */
    public function show(Status $status)
    {
        return new StatusResource($status->load(static::SHOW_WITH));
    }

    /**
     * Update an existing Status
     * 
     * @param StoreStatusRequest $request
     * @param Status             $status
     * 
     * @return StatusResource
     */
    public function update(StoreStatusRequest $request, Status $status)
    {
        if ($request->input('action') === 'restore') {
            $status->restore();
        }

        $status->update($request->validated());

        return $this->show($status);
    }

    /**
     * Save a new Status
     * 
     * @param Request $request
     * 
     * @return StatusResource
     */
    public function store(StoreStatusRequest $request)
    {
        $status = Status::create($request->validated());

        return $this->show($status);
    }

    /**
     * Delete a Status
     * 
     * @param Status $status
     * 
     * @return string
     */
    public function destroy(Status $status)
    {
        $status->delete();

        return '';
    }
}
