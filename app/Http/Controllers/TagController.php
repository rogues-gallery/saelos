<?php

namespace App\Http\Controllers;

use App\Company;
use App\Contact;
use App\Http\Resources\TagCollection;
use App\Opportunity;
use App\Tag;
use Illuminate\Http\Request;
use App\Http\Resources\Tag as TagResource;

class TagController extends Controller
{
    const INDEX_WITH = [
        'opportunities',
        'companies',
        'contacts',
    ];

    const SHOW_WITH = [
        'opportunities',
        'companies',
        'contacts',
    ];

    public function index()
    {
        return new TagCollection(Tag::with(static::INDEX_WITH)->paginate());
    }

    public function show($id)
    {
        return new TagResource(Tag::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        /** @var Tag $tag */
        $tag = Tag::findOrFail($id);
        $data = $request->all();
        $contactId = $data['contact_id'] ?? null;
        $contacts = $data['contacts'] ?? [];
        $companyId = $data['company_id'] ?? null;
        $companies = $data['companies'] ?? [];
        $opportunityId = $data['opportunity_id'] ?? null;
        $opportunities = $data['opportunities'] ?? [];

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

        $tag->contacts()->sync($contactIds);
        $tag->companies()->sync($companyIds);
        $tag->opportunities()->sync($opportunityIds);

        $tag->update($data);

        return $this->show($tag->id);
    }

    public function store(Request $request)
    {
        $tag = Tag::create($request->all());

        return $this->update($request, $tag->id);
    }

    public function destroy($id)
    {
        Tag::findOrFail($id)->delete();

        return '';
    }
}
