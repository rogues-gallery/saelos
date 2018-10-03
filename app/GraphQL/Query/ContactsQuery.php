<?php

namespace App\GraphQL\Query;

use App\Contact;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;

class ContactsQuery extends Query
{
    protected $attributes = [
        'name' => 'Contacts Query',
        'description' => 'A query of contacts'
    ];

    public function type()
    {
        return GraphQL::paginate('contact');
    }

    public function args()
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::int()
            ],
            'email' => [
                'name' => 'email',
                'type' => Type::string()
            ],
            'search' => [
                'type' => Type::string(),
                'description' => 'Search based on parameters'
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
        return Contact::with(array_keys($fields->getRelations()))
            ->where(function($query) use ($args) {
                if (isset($args['id'])) {
                    $query->where('id', $args['id']);
                }
                if (isset($args['email'])) {
                    $query->where('email', 'like', $args['email']);
                }
            })
            ->select($fields->getSelect())
            ->paginate($args['limit'] ?? 15, ['*'], 'page', $args['page'] ?? 1);
    }
}