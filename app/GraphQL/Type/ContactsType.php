<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;
use App\Contact;

class ContactsType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Contacts',
        'description' => 'A type',
        'model' => Contact::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'The id of the user'
            ],
            'email' => [
                'type' => Type::string(),
                'description' => 'The email of user'
            ],
            'first_name' => [
                'type' => Type::string(),
                'description' => 'The first name of the user'
            ],
            'last_name' => [
                'type' => Type::string(),
                'description' => 'The last name of the user'
            ],
            // field relation to model companies
            'companies' => [
                'type' => Type::listOf(GraphQL::type('companies')),
                'description' => 'The companies of the contact',
            ],
            'opportunities' => [
                'type' => Type::listOf(GraphQL::type('opportunities')),
                'description' => 'The opportunities of the contact',
            ]
        ];
    }
}