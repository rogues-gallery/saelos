<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;
use App\Company;

class CompanyType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Company',
        'description' => 'A type',
        'model' => Company::class
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'The id of the company'
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'The name of the company'
            ],
            // field relations
            'contacts' => [
                'type' => Type::listOf(GraphQL::type('contact')),
                'description' => 'List of contacts for this company'
            ],
            'opportunities' => [
                'type' => Type::listOf(GraphQL::type('opportunity')),
                'description' => 'The opportunities of the contact',
            ],
            'customFields' => [
                'type' => Type::listOf(GraphQL::type('custom_field_value')),
                'description' => 'The custom field values for the contact'
            ]
        ];
    }
}