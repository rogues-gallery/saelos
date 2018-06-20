<?php

namespace App\Http\Controllers;

use App\Field;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

/**
 * @resource Fields
 * 
 * @hideFromAPIDocumentation
 * 
 * @deprecated Use the /fields endpoint instead.
 */
class ContextController extends Controller
{
    /**
     * @hideFromAPIDocumentation
     */
    public function index()
    {
        return new Response('Not supported');
    }

    /**
     * List the fields for a given Model
     * 
     * @hideFromAPIDocumentation
     * 
     * @param Request $request
     * @param string  $model
     * 
     * @return JsonResponse
     */
    public function show(Request $request, string $model)
    {
        $model = 'App\\'.$model;

        if (class_exists($model) && is_a($model, Model::class, true)) {
            $attributes = [];

            $fields = Field::where('model', $model)->get();

            foreach ($fields->all() as $field) {
                $alias = $field->alias ?: Str::snake($field->label);

                $attributes[$alias] = [
                    'field_id' => $field->id,
                    'label' => $field->label,
                    'alias' => $alias,
                    'required' => $field->required,
                    'is_custom' => !$field->protected,
                    'type' => $field->type,
                    'options' => $field->values,
                    'default' => $field->default,
                    'group' => $field->group,
                    'ordering' => $field->ordering,
                    'hidden' => $field->hidden,
                    'protected' => $field->protected,
                    'summary' => $field->summary,
                    'searchable' => $field->searchable,
                ];
            }

            return new JsonResponse($attributes);
        }

        return new Response('Unknown model type.', Response::HTTP_NOT_ACCEPTABLE);
    }
}