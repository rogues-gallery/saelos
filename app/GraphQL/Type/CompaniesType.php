<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;
use App\Company;

class CompaniesType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Companies',
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
            'contacts' => [
                'type' => Type::listOf(GraphQL::type('contacts')),
                'description' => 'List of contacts for this company'
            ]
        ];
    }
}