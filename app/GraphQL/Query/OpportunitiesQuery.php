<?php

namespace App\GraphQL\Query;

use App\Opportunity;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;

class OpportunitiesQuery extends Query
{
    protected $attributes = [
        'name' => 'Opportunities Query',
        'description' => 'A query of opportunities'
    ];

    public function type()
    {
        return GraphQL::paginate("opportunities");
    }

    public function args()
    {
        return [
            'limit' => [
                'name' => 'limit',
                'type' => Type::int()
            ],
            'page' => [
                'name' => 'page',
                'type' => Type::int()
            ]
        ];
    }

    public function resolve($root, $args, SelectFields $fields, ResolveInfo $info)
    {
        return Opportunity::with(array_keys($fields->getRelations()))
            ->where(function($query) use ($args) {
            })
            ->select($fields->getSelect())
            ->paginate($args['limit'] ?? 15, ['*'], 'page', $args['page'] ?? 1);
    }
}