<?php

namespace App\Http\Controllers;

use App\CustomField;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class ContextController extends Controller
{
    public function index()
    {
        return new Response('Not supported');
    }

    public function show(Request $request, string $model)
    {
        $model = 'App\\'.$model;

        if (class_exists($model) && is_a($model, Model::class, true)) {
            $attributes = [];
            $customOnly = $request->get('customOnly', false);

            if (filter_var($customOnly, FILTER_VALIDATE_BOOLEAN) !== true) {
                $toIgnore = [
                    'id'
                ];

                $modelInstance = $model::first();

                foreach ($modelInstance->attributesToArray() as $key => $value) {
                    if (in_array($key, $toIgnore)) {
                        continue;
                    }

                    $attributes[$key] = [
                        'label' => $key,
                        'alias' => $key,
                        'required' => $key === 'email',
                        'group' => 'core'
                    ];
                }
            }

            $fields = CustomField::where('model', $model)->get();

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
                    'summary' => $field->summary
                ];
            }

            return new JsonResponse($attributes);
        }

        return new Response('Unknown model type.', Response::HTTP_NOT_ACCEPTABLE);
    }
}