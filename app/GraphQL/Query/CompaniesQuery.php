<?php

namespace App\GraphQL\Query;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;
use App\Company;

class CompaniesQuery extends Query
{
    protected $attributes = [
        'name' => 'Companies Query',
        'description' => 'A query for companies'
    ];

    public function type()
    {
        return GraphQL::paginate('company');
    }

    public function args()
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::int()
            ],
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
        return Company::with(array_keys($fields->getRelations()))
            ->where(function($query) use ($args) {
                if (isset($args['id'])) {
                    $query->where('id', $args['id']);
                }
            })
            ->select($fields->getSelect())
            ->paginate($args['limit'] ?? 15, ['*'], 'page', $args['page'] ?? 1);
    }
}