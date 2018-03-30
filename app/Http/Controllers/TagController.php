<?php

namespace App\Http\Controllers;

use App\Http\Resources\TagCollection;
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
        $tag = Tag::findOrFail($id);
        $data = $request->all();

        // @todo - associate items

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
