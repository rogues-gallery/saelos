<?php

namespace App\Http\Controllers;

use App\Http\Resources\FieldCollection;
use App\Field;
use Illuminate\Http\Request;
use App\Http\Resources\Field as FieldResource;

class FieldController extends Controller
{
    const INDEX_WITH = [
    ];

    const SHOW_WITH = [
    ];

    public function index()
    {
        return new FieldCollection(Field::with(static::INDEX_WITH)->paginate(100));
    }

    public function show($id)
    {
        return new FieldResource(Field::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        $stage = Field::findOrFail($id);
        $data = $request->all();

        $stage->update($data);

        return $stage;
    }

    public function store(Request $request)
    {
        return Field::create($request->all());
    }

    public function destroy($id)
    {
        Field::findOrFail($id)->delete();

        return '';
    }
}
