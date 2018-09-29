<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;
use App\CustomFieldValue;

class CustomFieldValueType extends GraphQLType
{
    protected $attributes = [
        'name' => 'CustomFieldValueType',
        'description' => 'A type'
    ];

    public function fields()
    {
        return [
            'custom_field_alias' => [
                'type' => Type::string()
            ],
            'value' => [
                'type' => Type::string()
            ]
        ];
    }
}