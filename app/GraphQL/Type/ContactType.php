<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;
use App\Contact;
use App\Field;

class ContactType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Contact',
        'description' => 'A contact',
        'model' => Contact::class,
    ];

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::int()),
                'description' => 'The id of the contact'
            ],
            'email' => [
                'type' => Type::string(),
                'description' => 'The email of contact'
            ],
            'first_name' => [
                'type' => Type::string(),
                'description' => 'The first name of the contact'
            ],
            'last_name' => [
                'type' => Type::string(),
                'description' => 'The last name of the contact'
            ],
            'address1' => [
                'type' => Type::string(),
                'description' => 'The address1 of the contact'
            ],
            'address2' => [
                'type' => Type::string(),
                'description' => 'The address2 of the contact'
            ],
            'city' => [
                'type' => Type::string(),
                'description' => 'The city of the contact'
            ],
            'state' => [
                'type' => Type::string(),
                'description' => 'The state of the contact'
            ],
            'zip' => [
                'type' => Type::string(),
                'description' => 'The zip of the contact'
            ],
            'country' => [
                'type' => Type::string(),
                'description' => 'The country of the contact'
            ],
            'phone' => [
                'type' => Type::string(),
                'description' => 'The phone of the contact'
            ],
            'fax' => [
                'type' => Type::string(),
                'description' => 'The fax of the contact'
            ],
            'website' => [
                'type' => Type::string(),
                'description' => 'The website of the contact'
            ],
            'info' => [
                'type' => Type::string(),
                'description' => 'The info of the contact'
            ],
            // field relations
            'companies' => [
                'type' => Type::listOf(GraphQL::type('company')),
                'description' => 'The companies of the contact',
            ],
            'opportunities' => [
                'type' => Type::listOf(GraphQL::type('opportunity')),
                'description' => 'The opportunities of the contact',
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'The user of the contact'
            ],
            'status' => [
                'type' => GraphQL::type('status'),
                'description' => 'The status of the contact'
            ],
            'customFields' => [
                'type' => Type::listOf(GraphQL::type('custom_field_value')),
                'description' => 'The custom field values for the contact'
            ]
        ];
    }
}