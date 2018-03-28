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

    public function index(Request $request)
    {
        $fields = Field::with(static::INDEX_WITH);

        if ($searchString = $request->get('searchString')) {
            $fields->where('label', 'LIKE', $searchString.'%');
        }

        $fields->orderBy('label');

        return new FieldCollection($fields->paginate(10000));
    }

    public function show($id)
    {
        return new FieldResource(Field::with(static::SHOW_WITH)->find($id));
    }

    public function update(Request $request, $id)
    {
        $stage = Field::findOrFail($id);
        $data = $request->all();

        // Cannot change alias after creation
        unset($data['alias']);

        $stage->update($data);

        return $this->show($stage->id);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if (!array_key_exists('alias', $data) || empty($data['alias'])) {
            $data['alias'] = preg_replace('/[^a-z_]/', '', snake_case($data['label']));
        }

        $alreadyExists = Field::where('model', $data['model'])
            ->where('alias', 'LIKE', $data['alias'].'%')
            ->get()->all();

        if (count($alreadyExists) > 0) {
            $data['alias'] = $data['alias'].'_'.count($alreadyExists);
        }

        $field = Field::create($data);

        return $this->update($request, $field->id);
    }

    public function destroy($id)
    {
        Field::findOrFail($id)->delete();

        return '';
    }
}
