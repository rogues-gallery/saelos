<?php

namespace App\GraphQL\Mutation;

use App\Contact;
use App\GraphQL\Type\ContactType;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use GraphQL;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;

class ContactMutation extends Mutation
{
    const NAME = 'createOrUpdateContact';

    protected $attributes = [
        'name' => self::NAME,
        'description' => 'Create a contact if no ID is specified, otherwise update.',
    ];

    public function type()
    {
        return GraphQL::type('contact');
    }

    public function args()
    {
        return [
            'id' => [
                'type' => Type::int(),
            ],
            'email' => [
                'type' => Type::string(),
            ],
            'first_name' => [
                'type' => Type::string(),
            ],
            'last_name' => [
                'type' => Type::string()
            ],
        ];
    }

    public function resolve($root, $args, SelectFields $fields, ResolveInfo $info)
    {
        $select = $fields->getSelect();
        $with = $fields->getRelations();

        ['id' => $id] = $args;
        unset($args['id']);
        

        $contact = Contact::find($id);
        
        $contact->update($args);

        return $contact;
    }
}