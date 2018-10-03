<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;
use App\Opportunity;

class OpportunityType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Opportunity',
        'description' => 'An opportunity'
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'The id of the opportunity'
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'The name of the opportunity'
            ],
            'amount' => [
                'type' => Type::int(),
                'description' => 'The amount for the opportunity.'
            ],
            // field relations
            'contacts' => [
                'type' => Type::listOf(GraphQL::type('contact')),
                'description' => 'List of contacts for this opportunity'
            ],
            'companies' => [
                'type' => Type::listOf(GraphQL::type('company')),
                'description' => 'The companies of the opportunity',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'The user of the opportunity'
            ],
            'customFields' => [
                'type' => Type::listOf(GraphQL::type('custom_field_value')),
                'description' => 'The custom field values for the contact'
            ]
        ];
    }
}