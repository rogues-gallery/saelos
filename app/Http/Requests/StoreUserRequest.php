<?php

namespace App\Http\Requests;

use App\Field;
use App\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    use SaelosFormRequestTrait;

    public function authorize()
    {
        $user = \Auth::user();

        if ($user->authorizeRoles(['admin', 'manager'])) {
            return true;
        }

        $routeUser = $this->route('user');

        return $user->id === $routeUser->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [];

        foreach (Field::where(['model' => User::class])->get() as $field) {
            // Custom fields shouldn't be added to top level validation.
            if ($field->protected) {
                $rules[$field->alias] = $this->buildRuleForField($field);
            }
        }

        $rules = $this->addCustomFieldRules($rules);

        $rules = array_merge($rules, [
            'name' => 'sometimes|required|string|max:255',
            'username' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'password' => 'sometimes|string',
            'second_password' => 'sometimes|required_with:password|same:password',
            'phone' => 'string|max:255',
            'team_id' => 'sometimes|exists:teams,id',
            'roles.*.id' => 'sometimes|required|exists:roles,id',
            'settings' => 'sometimes|array'
        ]);

        return $rules;
    }
}
