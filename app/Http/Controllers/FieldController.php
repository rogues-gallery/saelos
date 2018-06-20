<?php

namespace App\Http\Controllers;

use App\Field;
use App\Http\Resources\FieldCollection;
use Illuminate\Http\Request;
use App\Http\Resources\Field as FieldResource;

/**
 * @resource Fields
 * 
 * Interact with core & custom fields.
 */
class FieldController extends Controller
{
    const INDEX_WITH = [
    ];

    const SHOW_WITH = [
    ];

    /**
     * Fetching a filtered Field list.
     * 
     * @param Request $request
     * 
     * @return FieldCollection
     */
    public function index(Request $request)
    {
        $fields = Field::with(static::INDEX_WITH);

        if ($searchString = $request->get('searchString')) {
            $fields->where('label', 'LIKE', $searchString.'%');
        }

        $fields->orderBy('label');

        return new FieldCollection($fields->paginate(10000));
    }

    /**
     * Fetch a single Field
     * 
     * @param int $id
     * 
     * @return FieldResource
     */
    public function show($id)
    {
        return new FieldResource(Field::with(static::SHOW_WITH)->find($id));
    }

    /**
     * Update an existing Field
     * 
     * @param Request $request
     * @param int     $id
     * 
     * @return FieldResource
     */
    public function update(Request $request, $id)
    {

      if ($request->input('action') == 'restore'
        && Field::onlyTrashed()->where('id', $id)->restore()) {
            $field = Field::findOrFail($id);
            return $this->show($field->id);
      }

        $field = Field::findOrFail($id);
        $data = $request->all();

        // Cannot change alias after creation
        unset($data['alias']);

        $field->update($data);

        return $this->show($field->id);
    }

    /**
     * Save a new Field
     * 
     * @param Request $request
     * 
     * @return FieldResource
     */
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

    /**
     * Delete a Field
     * 
     * @param int $id
     * 
     * @return string
     */
    public function destroy($id)
    {
        Field::findOrFail($id)->delete();

        return '';
    }
}
