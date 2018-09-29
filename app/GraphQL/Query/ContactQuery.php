<?php

namespace App\GraphQL\Query;

use App\Contact;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\SelectFields;
use Rebing\GraphQL\Support\Query;
use Rebing\GraphQL\Support\Facades\GraphQL;

class ContactQuery extends Query
{
    protected $attributes = [
        'name' => 'Contact Query',
        'description' => 'Query for a specific contact'
    ];

    public function type()
    {
        return GraphQL::type('contacts');
    }

    public function args()
    {
        return [
            'id' => [
                'name' => 'id',
                'type' => Type::int(),
                'required' => true
            ],
        ];
    }

    public function resolve($root, $args, SelectFields $fields, ResolveInfo $info)
    {
        return Contact::with(array_keys($fields->getRelations()))
            ->where(function($query) use ($args) {
                if (isset($args['id'])) {
                    $query->where('id', $args['id']);
                }
            })
            ->select($fields->getSelect())
            ->first();
    }
}