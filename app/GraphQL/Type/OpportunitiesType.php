<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;
use App\Opportunity;

class OpportunitiesType extends GraphQLType
{
    protected $attributes = [
        'name' => 'OpportunitiesType',
        'description' => 'A type'
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
        ];
    }
}