<?php

namespace App\Http\Controllers;

use App\Company;
use App\Contact;
use App\Http\Requests\StoreTagRequest;
use App\Http\Resources\TagCollection;
use App\Opportunity;
use App\Tag;
use Illuminate\Http\Request;
use App\Http\Resources\Tag as TagResource;

/**
 * @resource Tags
 * 
 * Interact with Tags
 */
class TagController extends Controller
{
    const INDEX_WITH = [
        'opportunities',
        'companies',
        'contacts'
    ];

    const SHOW_WITH = [
        'opportunities',
        'companies',
        'contacts',
        'activities'
    ];

    /**
     * Fetching Tags
     * 
     * @return TagCollection
     */
    public function index()
    {
        return new TagCollection(Tag::with(static::INDEX_WITH)->paginate(1000));
    }

    /**
     * Fetch a single Tag
     * 
     * @param Tag $tag
     * 
     * @return TagResource
     */
    public function show(Tag $tag)
    {
        return new TagResource($tag->load(static::SHOW_WITH));
    }

    /**
     * Update an existing Tag
     * 
     * @param StoreTagRequest $request
     * @param Tag             $tag
     * 
     * @return TagResource
     */
    public function update(StoreTagRequest $request, Tag $tag)
    {
        if ($request->input('action') === 'restore') {
            $tag->restore();
        }

        $data = $request->validated();
        var_dump($data);die;
        $contactId = $data['contact_id'] ?? null;
        $contacts = $data['contacts'] ?? $tag->contacts()->get()->all();
        $companyId = $data['company_id'] ?? null;
        $companies = $data['companies'] ?? $tag->companies()->get()->all();
        $opportunityId = $data['opportunity_id'] ?? null;
        $opportunities = $data['opportunities'] ?? $tag->opportunities()->get()->all();
        $activityId = $data['activity_id'] ?? null;
        $activities = $data['activities'] ?? $tag->activities()->get()->all();

        $contactIds = array_map(function($c) { return $c['id']; }, $contacts);

        if ($contactId && !in_array($contactId, $contactIds)) {
            $contactIds[] = $contactId;
        }

        $companyIds = array_map(function($c) { return $c['id']; }, $companies);

        if ($companyId && !in_array($companyId, $companyIds)) {
            $companyIds[] = $companyId;
        }

        $opportunityIds = array_map(function($o) { return $o['id']; }, $opportunities);

        if ($opportunityId && !in_array($opportunityId, $opportunityIds)) {
            $opportunityIds[] = $opportunityId;
        }

        $activityIds = array_map(function($a) { return $a['id']; }, $activities);

        if ($activityId && !in_array($activityId, $activityIds)) {
            $activityIds[] = $activityId;
        }

        $tag->contacts()->sync($contactIds);
        $tag->companies()->sync($companyIds);
        $tag->opportunities()->sync($opportunityIds);
        $tag->activities()->sync($activityIds);

        $tag->update($data);

        return $this->show($tag);
    }

    /**
     * Save a new Tag
     * 
     * @param StoreTagRequest $request
     * 
     * @return TagResource
     */
    public function store(StoreTagRequest $request)
    {
        $tag = Tag::create($request->validated());

        return $this->update($request, $tag);
    }

    /**
     * Delete a Tag
     * 
     * @param Tag $tag
     * 
     * @return string
     */
    public function destroy(Tag $tag)
    {
        $tag->opportunities()->sync([]);
        $tag->contacts()->sync([]);
        $tag->companies()->sync([]);
        $tag->activities()->sync([]);

        $tag->delete();

        return '';
    }
}
