<?php

namespace App\Http\Controllers;

use App\Field;
use App\Http\Requests\StoreFieldRequest;
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
     * @param Field $field
     * 
     * @return FieldResource
     */
    public function show(Field $field)
    {
        return new FieldResource($field->load(static::SHOW_WITH));
    }

    /**
     * Update an existing Field
     * 
     * @param StoreFieldRequest $request
     * @param Field             $field
     * 
     * @return FieldResource
     */
    public function update(StoreFieldRequest $request, Field $field)
    {

        if ($request->input('action') === 'restore' && $field->restore()) {
              return $this->show($field);
        }

        $data = $request->validated();

        // Cannot change alias after creation
        unset($data['alias']);

        $field->update($data);

        return $this->show($field);
    }

    /**
     * Save a new Field
     * 
     * @param StoreFieldRequest $request
     * 
     * @return FieldResource
     */
    public function store(StoreFieldRequest $request)
    {
        $data = $request->validated();

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

        return $this->update($request, $field);
    }

    /**
     * Delete a Field
     * 
     * @param Field $field
     * 
     * @return string
     */
    public function destroy(Field $field)
    {
        $field->delete();

        return '';
    }
}
