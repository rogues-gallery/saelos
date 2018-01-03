<?php

namespace App\Console\Commands;

use App\Company;
use App\CustomField;
use App\CustomFieldValue;
use App\Deal;
use App\Person;
use App\Stage;
use App\Team;
use App\User;
use Illuminate\Console\Command;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\DB;

class MigrateToNew extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'saelos:migrate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate old Saelos DB to new structure.';

    /**
     * @var Connection
     */
    private $connection;
    private $teams = [];
    private $teamLeaders = [];
    private $users = [];
    private $companies = [];
    private $stages = [];
    private $people = [];
    private $deals = [];
    private $customFields = [];

    /**
     * Execute the console command
     *
     * @throws \Throwable
     */
    public function handle()
    {
        $this->connection = DB::connection('old_saelos');

        $this->info('Migrating the database.');
        $this->callSilent('migrate:fresh', ['--force' => true]);

        $this->importTeams();
        $this->importUsers();
        $this->importCompanyCustomFields();
        $this->importDealCustomFields();
        $this->importPeopleCustomFields();
        $this->importStages();
        $this->importCompanies();
        $this->importDeals();
        $this->importPeople();
        $this->importActivities();
        $this->importNotes();
    }

    /**
     * @throws \Throwable
     */
    private function importTeams()
    {
        $this->info('Starting import of Teams');

        $query = $this->connection->table('saelos_teams')
            ->select();

        $page = 1;

        do {
            $teams = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->output->createProgressBar($teams->total());
            }

            foreach ($teams as $team) {
                $newTeam = new Team();

                $newTeam->title = $team->name;

                $newTeam->saveOrFail();

                $this->teams[$team->id] = $newTeam->id;
                $this->teamLeaders[$team->id] = $team->leader_id;

                $bar->advance();
            }

            $page++;

        } while($page <= $teams->lastPage());

        $bar->finish();
        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importUsers()
    {
        $this->info('Starting import of Users');

        $query = $this->connection->table('saelos_users')
            ->select();

        $page = 1;

        do {
            $users = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->output->createProgressBar($users->total());
            }

            foreach ($users as $user) {
                $newUser = new User();

                $newUser->name = $user->first_name.' '.$user->last_name;
                $newUser->email = $user->email;
                $newUser->password = 'Mautic12';
                $newUser->team_id = $this->teams[$user->team_id];

                $newUser->saveOrFail();

                $this->users[$user->id] = $newUser->id;

                if ($this->teamLeaders[$user->team_id] === $user->id) {
                    Team::find($this->teams[$user->team_id])
                        ->leader()->associate($newUser)->save();
                }

                $bar->advance();
            }

            $page++;

        } while ($page <= $users->lastPage());

        $bar->finish();
        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importCompanyCustomFields()
    {
        $this->info('Starting import of Company custom fields');

        $query = $this->connection->table('saelos_company_custom_fields')
            ->select();

        $page = 1;

        do {
            $fields = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->output->createProgressBar($fields->total());
            }

            foreach ($fields as $field) {
                $newField = new CustomField();

                $newField->label = $field->name;
                $newField->alias = strtolower(str_replace(' ', '_', $field->alias));
                $newField->model = Company::class;
                $newField->group = 'core';
                $newField->type = $field->type;
                $newField->required = $field->required;
                $newField->values = (function($values) {
                    $values = json_decode($values);
                    $newValues = [];

                    if (empty($values)) {
                        return null;
                    }

                    foreach ($values as $val) {
                        $newValues[$val->value] = $val->label;
                    }

                    return $newValues;
                })($field->values);

                $newField->saveOrFail();

                $this->customFields[$field->alias] = $newField->id;

                $bar->advance();
            }

            $page++;

        } while ($page <= $fields->lastPage());

        $bar->finish();
        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importDealCustomFields()
    {
        $this->info('Starting import of Deal custom fields');

        $query = $this->connection->table('saelos_deal_custom_fields')
            ->select();

        $page = 1;

        do {
            $fields = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->output->createProgressBar($fields->total());
            }

            foreach ($fields as $field) {
                $newField = new CustomField();

                $newField->label = $field->name;
                $newField->alias = $field->alias ?? strtolower(str_replace(' ', '_', $field->name));
                $newField->model = Deal::class;
                $newField->group = 'core';
                $newField->type = $field->type;
                $newField->required = $field->required;
                $newField->values = (function($values) {
                    $values = json_decode($values);
                    $newValues = [];

                    if (empty($values)) {
                        return null;
                    }

                    foreach ($values as $val) {
                        $newValues[$val->value] = $val->label;
                    }

                    return $newValues;
                })($field->values);

                $newField->saveOrFail();

                $this->customFields[$field->alias] = $newField->id;

                $bar->advance();
            }

            $page++;

        } while ($page <= $fields->lastPage());

        $bar->finish();
        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importPeopleCustomFields()
    {
        $this->info('Starting import of People custom fields');

        $query = $this->connection->table('saelos_people_custom_fields')
            ->select();

        $page = 1;

        do {
            $fields = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->output->createProgressBar($fields->total());
            }

            foreach ($fields as $field) {
                $newField = new CustomField();

                $newField->label = $field->name;
                $newField->alias = strtolower(str_replace(' ', '_', $field->alias));
                $newField->model = Person::class;
                $newField->group = 'core';
                $newField->type = $field->type;
                $newField->required = $field->required;
                $newField->values = (function($values) {
                    $values = json_decode($values);
                    $newValues = [];

                    if (empty($values)) {
                        return null;
                    }

                    foreach ($values as $val) {
                        $newValues[$val->value] = $val->label;
                    }

                    return $newValues;
                })($field->values);

                $newField->saveOrFail();

                $this->customFields[$field->alias] = $newField->id;

                $bar->advance();
            }

            $page++;

        } while ($page <= $fields->lastPage());

        $bar->finish();
        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importStages()
    {
        $this->info('Starting import of Stages');

        $query = $this->connection->table('saelos_stages')
            ->select();

        $page = 1;

        do {
            $stages = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->output->createProgressBar($stages->total());
            }

            foreach ($stages as $stage) {
                $newStage = new Stage();

                $newStage->title = $stage->name;
                $newStage->probability = $stage->percent;
                $newStage->active = (int) !$stage->won;

                $newStage->saveOrFail();

                $this->stages[$stage->id] = $newStage->id;

                $bar->advance();
            }

            $page++;

        } while($page <= $stages->lastPage());

        $bar->finish();
        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importCompanies()
    {
        $this->info('Starting import of Companies');

        $query = $this->connection->table('saelos_companies')
            ->select();

        $page = 1;

        do {
            $companies = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->output->createProgressBar($companies->total());
            }

            foreach ($companies as $company) {
                $newCompany = new Company();

                $newCompany->name = $company->name;
                $newCompany->published = $company->published;
                $newCompany->address1 = $company->address_1;
                $newCompany->address2 = $company->address_2;
                $newCompany->city = $company->address_city;
                $newCompany->state = $company->address_state;
                $newCompany->zip = $company->address_zip;
                $newCompany->country = $company->address_country;
                $newCompany->phone = $company->phone;
                $newCompany->fax = $company->fax;
                $newCompany->website = $company->website;
                $newCompany->user_id = $this->users[$company->owner_id] ?? null;

                $newCompany->saveOrFail();

                $this->companies[$company->id] = $newCompany->id;

                $this->importCustomFieldValues($company->custom_fields, Company::class, $newCompany->id);

                $bar->advance();
            }

            $page++;

        } while ($page <= $companies->lastPage());

        $bar->finish();
        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importDeals()
    {
        $this->info('Starting import of Deals');

        $query = $this->connection->table('saelos_deals')
            ->select();

        $page = 1;

        do {
            $deals = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->output->createProgressBar($deals->total());
            }

            foreach ($deals as $deal) {
                $newDeal = new Deal();

                $newDeal->published = $deal->published;
                $newDeal->name = $deal->name;
                $newDeal->summary = $deal->summary;
                $newDeal->amount = $deal->amount;
                $newDeal->probability = $deal->probability;
                $newDeal->expected_close = $deal->expected_close;
                $newDeal->actual_close = $deal->actual_close;
                $newDeal->last_viewed = $deal->last_viewed;
                $newDeal->user_id = $this->users[$deal->owner_id] ?? null;
                $newDeal->company_id = $this->companies[$deal->company_id] ?? null;
                $newDeal->setCreatedAt($deal->created);
                $newDeal->setUpdatedAt($deal->modified);
                $newDeal->stage_id = $this->stages[$deal->stage_id] ?? null;

                $newDeal->saveOrFail();

                $this->deals[$deal->id] = $newDeal->id;

                $this->importCustomFieldValues($deal->custom_fields, Deal::class, $newDeal->id);

                $bar->advance();
            }

            $page++;
        } while ($page <= $deals->lastPage());

        $bar->finish();
        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importPeople()
    {
        $this->info('Starting import of People');

        $query = $this->connection->table('saelos_people')
            ->select();

        $page = 1;

        do {
            $people = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->output->createProgressBar($people->total());
            }

            foreach ($people as $person) {
                $newPerson = new Person();

                $newPerson->published = $person->published;
                $newPerson->first_name = $person->first_name;
                $newPerson->last_name = $person->last_name;
                $newPerson->position = $person->position;
                $newPerson->email = $person->email;
                $newPerson->address1 = $person->home_address_1;
                $newPerson->address2 = $person->home_address_2;
                $newPerson->city = $person->home_city;
                $newPerson->state = $person->home_state;
                $newPerson->zip = $person->home_zip;
                $newPerson->country = $person->home_country;
                $newPerson->phone = $person->phone;
                $newPerson->fax = $person->fax;
                $newPerson->website = $person->website;
                $newPerson->info = $person->info;
                $newPerson->user_id = $this->users[$person->assignee_id] ?? null;
                $newPerson->company_id = $this->companies[$person->company_id] ?? null;

                $newPerson->saveOrFail();

                $this->people[$person->id] = $newPerson->id;

                $this->importCustomFieldValues($person->custom_fields, Person::class, $newPerson->id);

                $bar->advance();
            }

            $page++;

        } while ($page <= $people->lastPage());

        $bar->finish();
        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importActivities()
    {
        $this->info('Starting import of Activities');

        $page = 1;

        $this->line('');
    }

    /**
     * @throws \Throwable
     */
    private function importNotes()
    {
        $this->info('Starting import of Activities');

        $page = 1;

        $this->line('');
    }

    /**
     * @param $fields
     * @param $model
     * @param $id
     *
     * @throws \Throwable
     */
    private function importCustomFieldValues($fields, $model, $id)
    {
        if ($fields === null) {
            return;
        }

        $data = json_decode($fields, true);

        if (empty($data)) {
            return;
        }

        foreach ($data as $key => $value) {
            if (empty($value)) {
                continue;
            }

            $field = CustomField::where('alias', $key)
                ->where('model', $model)
                ->first();

            if (!$field) {
                continue;
            }

            if (is_array($value)) {
                $value = json_encode($value);
            }

            $fieldValue = new CustomFieldValue();

            $fieldValue->model_id = $id;
            $fieldValue->model_type = $model;
            $fieldValue->custom_field_id = $field->id;
            $fieldValue->value = $value;

            $fieldValue->saveOrFail();

            unset($fieldValue);
        }
    }
}
