<?php

namespace App\Console\Commands;

use App\Company;
use App\CustomField;
use App\CustomFieldValue;
use App\Deal;
use App\Note;
use App\Person;
use App\Stage;
use App\Team;
use App\User;
use Illuminate\Console\Command;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use libphonenumber\NumberParseException;
use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;
use Symfony\Component\Console\Helper\ProgressBar;

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

    /**
     * @var PhoneNumberUtil
     */
    private $phoneUtil;
    private $teams = [];
    private $teamLeaders = [];
    private $users = [];
    private $companies = [];
    private $stages = [];
    private $people = [];
    private $deals = [];
    private $customFields = [];
    private $dealContacts = [];

    /**
     * Execute the console command
     *
     * @throws \Throwable
     */
    public function handle()
    {
        $this->connection = DB::connection('old_saelos');
        $this->phoneUtil = PhoneNumberUtil::getInstance();

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
     * @param $total
     *
     * @return ProgressBar
     */
    private function createProgressBar($total): ProgressBar
    {
        $bar = $this->output->createProgressBar($total);

        $bar->setFormat(' [%bar%] %percent:3s%% %current%/%max%');

        return $bar;
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
                $bar = $this->createProgressBar($teams->total());
            }

            foreach ($teams as $team) {
                $newTeam = new Team();

                $newTeam->title = $team->name;

                $newTeam->saveOrFail();

                $this->teams[$team->id]       = $newTeam->id;
                $this->teamLeaders[$team->id] = $team->leader_id;

                $bar->advance();
            }

            $page++;

        } while ($page <= $teams->lastPage());

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
                $bar = $this->createProgressBar($users->total());
            }

            foreach ($users as $user) {
                $newUser = new User();

                $newUser->name     = $user->first_name.' '.$user->last_name;
                $newUser->email    = $user->email;
                $newUser->password = \Hash::make('Mautic12');
                $newUser->phone    = $user->phone;
                $newUser->team_id  = $this->teams[$user->team_id];

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
                $bar = $this->createProgressBar($fields->total());
            }

            foreach ($fields as $field) {
                $newField = new CustomField();

                $newField->label    = $field->name;
                $newField->alias    = $field->alias ? Str::snake($field->alias) : Str::snake($field->name);
                $newField->model    = Company::class;
                $newField->group    = 'core';
                $newField->type     = $field->type;
                $newField->required = $field->required;
                $newField->values   = (function ($values) {
                    $values    = json_decode($values);
                    $newValues = [];

                    if (empty($values)) {
                        return null;
                    }

                    foreach ($values as $val) {
                        $newValues[$val->value] = $val->label;
                    }

                    return $newValues;
                })(
                    $field->values
                );

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
                $bar = $this->createProgressBar($fields->total());
            }

            foreach ($fields as $field) {
                $newField = new CustomField();

                $newField->label    = $field->name;
                $newField->alias    = $field->alias ? Str::snake($field->alias) : Str::snake($field->name);
                $newField->model    = Deal::class;
                $newField->group    = 'core';
                $newField->type     = $field->type;
                $newField->required = $field->required;
                $newField->values   = (function ($values) {
                    $values    = json_decode($values);
                    $newValues = [];

                    if (empty($values)) {
                        return null;
                    }

                    foreach ($values as $val) {
                        $newValues[$val->value] = $val->label;
                    }

                    return $newValues;
                })(
                    $field->values
                );

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
                $bar = $this->createProgressBar($fields->total());
            }

            foreach ($fields as $field) {
                $newField = new CustomField();

                $newField->label    = $field->name;
                $newField->alias    = $field->alias ? Str::snake($field->alias) : Str::snake($field->name);
                $newField->model    = Person::class;
                $newField->group    = 'core';
                $newField->type     = $field->type;
                $newField->required = $field->required;
                $newField->values   = (function ($values) {
                    $values    = json_decode($values);
                    $newValues = [];

                    if (empty($values)) {
                        return null;
                    }

                    foreach ($values as $val) {
                        $newValues[$val->value] = $val->label;
                    }

                    return $newValues;
                })(
                    $field->values
                );

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
                $bar = $this->createProgressBar($stages->total());
            }

            foreach ($stages as $stage) {
                $newStage = new Stage();

                $newStage->title       = $stage->name;
                $newStage->probability = $stage->percent;
                $newStage->active      = (int)!$stage->won;

                $newStage->saveOrFail();

                $this->stages[$stage->id] = $newStage->id;

                $bar->advance();
            }

            $page++;

        } while ($page <= $stages->lastPage());

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
                $bar = $this->createProgressBar($companies->total());
            }

            foreach ($companies as $company) {
                $newCompany = new Company();

                $newCompany->name      = $company->name;
                $newCompany->published = $company->published;
                $newCompany->address1  = $company->address_1;
                $newCompany->address2  = $company->address_2;
                $newCompany->city      = $company->address_city;
                $newCompany->state     = $company->address_state;
                $newCompany->zip       = $company->address_zip;
                $newCompany->country   = $company->address_country;
                $newCompany->phone     = $this->getBestPhone($company);
                $newCompany->fax       = $company->fax;
                $newCompany->website   = $company->website;
                $newCompany->user_id   = $this->users[$company->owner_id] ?? null;
                $newCompany->setCreatedAt($company->created);
                $newCompany->setUpdatedAt($company->modified);

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
                $bar = $this->createProgressBar($deals->total());
            }

            foreach ($deals as $deal) {
                $newDeal = new Deal();

                $newDeal->published      = $deal->published;
                $newDeal->name           = $deal->name;
                $newDeal->summary        = $deal->summary;
                $newDeal->amount         = $deal->amount;
                $newDeal->probability    = $deal->probability;
                $newDeal->expected_close = $deal->expected_close;
                $newDeal->actual_close   = $deal->actual_close;
                $newDeal->last_viewed    = $deal->last_viewed;
                $newDeal->user_id        = $this->users[$deal->owner_id] ?? null;
                $newDeal->company_id     = $this->companies[$deal->company_id] ?? null;
                $newDeal->setCreatedAt($deal->created);
                $newDeal->setUpdatedAt($deal->modified);
                $newDeal->stage_id = $this->stages[$deal->stage_id] ?? null;

                $newDeal->saveOrFail();

                $this->deals[$deal->id]                        = $newDeal->id;
                $this->dealContacts[$deal->primary_contact_id] = $newDeal->id;

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
                $bar = $this->createProgressBar($people->total());
            }

            foreach ($people as $person) {
                $newPerson = new Person();

                $newPerson->published  = $person->published;
                $newPerson->first_name = $person->first_name;
                $newPerson->last_name  = $person->last_name;
                $newPerson->position   = $person->position;
                $newPerson->email      = $person->email;
                $newPerson->address1   = $person->work_address_1;
                $newPerson->address2   = $person->work_address_2;
                $newPerson->city       = $person->work_city;
                $newPerson->state      = $person->work_state;
                $newPerson->zip        = $person->work_zip;
                $newPerson->country    = $person->work_country;
                $newPerson->phone      = $this->getBestPhone($person);
                $newPerson->fax        = $person->fax;
                $newPerson->website    = $person->website;
                $newPerson->info       = $person->info;
                $newPerson->user_id    = $this->users[$person->assignee_id] ?? null;
                $newPerson->company_id = $this->companies[$person->company_id] ?? null;
                $newPerson->setCreatedAt($person->created);
                $newPerson->setUpdatedAt($person->modified);

                $newPerson->saveOrFail();

                $this->people[$person->id] = $newPerson->id;

                if (isset($this->dealContacts[$person->id])) {
                    $this->associatePersonWithDeal($newPerson->id, $this->dealContacts[$person->id]);
                }

                $this->importCustomFieldValues($person->custom_fields, Person::class, $newPerson->id);

                $bar->advance();
            }

            $page++;

        } while ($page <= $people->lastPage());

        $bar->finish();
        $this->line('');
    }

    private function associatePersonWithDeal($personID, $dealID)
    {
        \DB::insert(
            'INSERT INTO deal_person (deal_id, person_id, `primary`) VALUES (?, ?, 1)',
            [
                $dealID,
                $personID
            ]
        );
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
        $this->info('Starting import of Notes');

        $page = 1;

        $query = $this->connection->table('saelos_notes')
            ->select();

        do {
            $notes = $query->paginate(15, ['*'], 'page', $page);

            if (!isset($bar)) {
                $bar = $this->createProgressBar($notes->total());
            }

            foreach ($notes as $note) {
                $newNote = new Note();

                $newNote->name = $note->name;
                $newNote->note = $note->note;
                $newNote->user_id = $this->users[$note->owner_id] ?? null;

                if ($note->person_id) {
                    $newNote->entity_type = Person::class;
                    $newNote->entity_id = $this->people[$note->person_id];
                } elseif ($note->company_id) {
                    $newNote->entity_type = Company::class;
                    $newNote->entity_id = $this->companies[$note->company_id];
                } elseif ($note->deal_id) {
                    $newNote->entity_type = Deal::class;
                    $newNote->entity_id = $this->deals[$note->deal_id];
                } else {
                    // If we don't have an entity, don't save this note
                    continue;
                }

                $newNote->setCreatedAt($note->created);
                $newNote->setUpdatedAt($note->modified);

                $newNote->saveOrFail();

                $bar->advance();
            }

            $page++;

        } while ($page <= $notes->lastPage());

        $bar->finish();
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

    /**
     * @param \stdClass $object
     *
     * @return string
     */
    private function getBestPhone(\stdClass $object): ?string
    {
        $countryCode = $this->getCountryCodeByName($object->work_country ?? $object->address_country ?? null);

        try {
            $numberProto = $this->phoneUtil->parse($object->phone, $countryCode);
        } catch (NumberParseException $e) {
            return $object->phone;
        }

        return $this->phoneUtil->format($numberProto, PhoneNumberFormat::E164);
    }

    /**
     * @param ?string $name
     *
     * @return ?string
     */
    private function getCountryCodeByName(?string $name): ?string
    {
        $countries = [
            'AF' => 'Afghanistan',
            'AX' => 'Aland Islands',
            'AL' => 'Albania',
            'DZ' => 'Algeria',
            'AS' => 'American Samoa',
            'AD' => 'Andorra',
            'AO' => 'Angola',
            'AI' => 'Anguilla',
            'AQ' => 'Antarctica',
            'AG' => 'Antigua And Barbuda',
            'AR' => 'Argentina',
            'AM' => 'Armenia',
            'AW' => 'Aruba',
            'AU' => 'Australia',
            'AT' => 'Austria',
            'AZ' => 'Azerbaijan',
            'BS' => 'Bahamas',
            'BH' => 'Bahrain',
            'BD' => 'Bangladesh',
            'BB' => 'Barbados',
            'BY' => 'Belarus',
            'BE' => 'Belgium',
            'BZ' => 'Belize',
            'BJ' => 'Benin',
            'BM' => 'Bermuda',
            'BT' => 'Bhutan',
            'BO' => 'Bolivia',
            'BA' => 'Bosnia And Herzegovina',
            'BW' => 'Botswana',
            'BV' => 'Bouvet Island',
            'BR' => 'Brazil',
            'IO' => 'British Indian Ocean Territory',
            'BN' => 'Brunei Darussalam',
            'BG' => 'Bulgaria',
            'BF' => 'Burkina Faso',
            'BI' => 'Burundi',
            'KH' => 'Cambodia',
            'CM' => 'Cameroon',
            'CA' => 'Canada',
            'CV' => 'Cape Verde',
            'KY' => 'Cayman Islands',
            'CF' => 'Central African Republic',
            'TD' => 'Chad',
            'CL' => 'Chile',
            'CN' => 'China',
            'CX' => 'Christmas Island',
            'CC' => 'Cocos (Keeling) Islands',
            'CO' => 'Colombia',
            'KM' => 'Comoros',
            'CG' => 'Congo',
            'CD' => 'Congo, Democratic Republic',
            'CK' => 'Cook Islands',
            'CR' => 'Costa Rica',
            'CI' => 'Cote D\'Ivoire',
            'HR' => 'Croatia',
            'CU' => 'Cuba',
            'CY' => 'Cyprus',
            'CZ' => 'Czech Republic',
            'DK' => 'Denmark',
            'DJ' => 'Djibouti',
            'DM' => 'Dominica',
            'DO' => 'Dominican Republic',
            'EC' => 'Ecuador',
            'EG' => 'Egypt',
            'SV' => 'El Salvador',
            'GQ' => 'Equatorial Guinea',
            'ER' => 'Eritrea',
            'EE' => 'Estonia',
            'ET' => 'Ethiopia',
            'FK' => 'Falkland Islands (Malvinas)',
            'FO' => 'Faroe Islands',
            'FJ' => 'Fiji',
            'FI' => 'Finland',
            'FR' => 'France',
            'GF' => 'French Guiana',
            'PF' => 'French Polynesia',
            'TF' => 'French Southern Territories',
            'GA' => 'Gabon',
            'GM' => 'Gambia',
            'GE' => 'Georgia',
            'DE' => 'Germany',
            'GH' => 'Ghana',
            'GI' => 'Gibraltar',
            'GR' => 'Greece',
            'GL' => 'Greenland',
            'GD' => 'Grenada',
            'GP' => 'Guadeloupe',
            'GU' => 'Guam',
            'GT' => 'Guatemala',
            'GG' => 'Guernsey',
            'GN' => 'Guinea',
            'GW' => 'Guinea-Bissau',
            'GY' => 'Guyana',
            'HT' => 'Haiti',
            'HM' => 'Heard Island & Mcdonald Islands',
            'VA' => 'Holy See (Vatican City State)',
            'HN' => 'Honduras',
            'HK' => 'Hong Kong',
            'HU' => 'Hungary',
            'IS' => 'Iceland',
            'IN' => 'India',
            'ID' => 'Indonesia',
            'IR' => 'Iran, Islamic Republic Of',
            'IQ' => 'Iraq',
            'IE' => 'Ireland',
            'IM' => 'Isle Of Man',
            'IL' => 'Israel',
            'IT' => 'Italy',
            'JM' => 'Jamaica',
            'JP' => 'Japan',
            'JE' => 'Jersey',
            'JO' => 'Jordan',
            'KZ' => 'Kazakhstan',
            'KE' => 'Kenya',
            'KI' => 'Kiribati',
            'KR' => 'Korea',
            'KW' => 'Kuwait',
            'KG' => 'Kyrgyzstan',
            'LA' => 'Lao People\'s Democratic Republic',
            'LV' => 'Latvia',
            'LB' => 'Lebanon',
            'LS' => 'Lesotho',
            'LR' => 'Liberia',
            'LY' => 'Libyan Arab Jamahiriya',
            'LI' => 'Liechtenstein',
            'LT' => 'Lithuania',
            'LU' => 'Luxembourg',
            'MO' => 'Macao',
            'MK' => 'Macedonia',
            'MG' => 'Madagascar',
            'MW' => 'Malawi',
            'MY' => 'Malaysia',
            'MV' => 'Maldives',
            'ML' => 'Mali',
            'MT' => 'Malta',
            'MH' => 'Marshall Islands',
            'MQ' => 'Martinique',
            'MR' => 'Mauritania',
            'MU' => 'Mauritius',
            'YT' => 'Mayotte',
            'MX' => 'Mexico',
            'FM' => 'Micronesia, Federated States Of',
            'MD' => 'Moldova',
            'MC' => 'Monaco',
            'MN' => 'Mongolia',
            'ME' => 'Montenegro',
            'MS' => 'Montserrat',
            'MA' => 'Morocco',
            'MZ' => 'Mozambique',
            'MM' => 'Myanmar',
            'NA' => 'Namibia',
            'NR' => 'Nauru',
            'NP' => 'Nepal',
            'NL' => 'Netherlands',
            'AN' => 'Netherlands Antilles',
            'NC' => 'New Caledonia',
            'NZ' => 'New Zealand',
            'NI' => 'Nicaragua',
            'NE' => 'Niger',
            'NG' => 'Nigeria',
            'NU' => 'Niue',
            'NF' => 'Norfolk Island',
            'MP' => 'Northern Mariana Islands',
            'NO' => 'Norway',
            'OM' => 'Oman',
            'PK' => 'Pakistan',
            'PW' => 'Palau',
            'PS' => 'Palestinian Territory, Occupied',
            'PA' => 'Panama',
            'PG' => 'Papua New Guinea',
            'PY' => 'Paraguay',
            'PE' => 'Peru',
            'PH' => 'Philippines',
            'PN' => 'Pitcairn',
            'PL' => 'Poland',
            'PT' => 'Portugal',
            'PR' => 'Puerto Rico',
            'QA' => 'Qatar',
            'RE' => 'Reunion',
            'RO' => 'Romania',
            'RU' => 'Russian Federation',
            'RW' => 'Rwanda',
            'BL' => 'Saint Barthelemy',
            'SH' => 'Saint Helena',
            'KN' => 'Saint Kitts And Nevis',
            'LC' => 'Saint Lucia',
            'MF' => 'Saint Martin',
            'PM' => 'Saint Pierre And Miquelon',
            'VC' => 'Saint Vincent And Grenadines',
            'WS' => 'Samoa',
            'SM' => 'San Marino',
            'ST' => 'Sao Tome And Principe',
            'SA' => 'Saudi Arabia',
            'SN' => 'Senegal',
            'RS' => 'Serbia',
            'SC' => 'Seychelles',
            'SL' => 'Sierra Leone',
            'SG' => 'Singapore',
            'SK' => 'Slovakia',
            'SI' => 'Slovenia',
            'SB' => 'Solomon Islands',
            'SO' => 'Somalia',
            'ZA' => 'South Africa',
            'GS' => 'South Georgia And Sandwich Isl.',
            'ES' => 'Spain',
            'LK' => 'Sri Lanka',
            'SD' => 'Sudan',
            'SR' => 'Suriname',
            'SJ' => 'Svalbard And Jan Mayen',
            'SZ' => 'Swaziland',
            'SE' => 'Sweden',
            'CH' => 'Switzerland',
            'SY' => 'Syrian Arab Republic',
            'TW' => 'Taiwan',
            'TJ' => 'Tajikistan',
            'TZ' => 'Tanzania',
            'TH' => 'Thailand',
            'TL' => 'Timor-Leste',
            'TG' => 'Togo',
            'TK' => 'Tokelau',
            'TO' => 'Tonga',
            'TT' => 'Trinidad And Tobago',
            'TN' => 'Tunisia',
            'TR' => 'Turkey',
            'TM' => 'Turkmenistan',
            'TC' => 'Turks And Caicos Islands',
            'TV' => 'Tuvalu',
            'UG' => 'Uganda',
            'UA' => 'Ukraine',
            'AE' => 'United Arab Emirates',
            'GB' => 'United Kingdom',
            'US' => 'United States',
            'UM' => 'United States Outlying Islands',
            'UY' => 'Uruguay',
            'UZ' => 'Uzbekistan',
            'VU' => 'Vanuatu',
            'VE' => 'Venezuela',
            'VN' => 'Viet Nam',
            'VG' => 'Virgin Islands, British',
            'VI' => 'Virgin Islands, U.S.',
            'WF' => 'Wallis And Futuna',
            'EH' => 'Western Sahara',
            'YE' => 'Yemen',
            'ZM' => 'Zambia',
            'ZW' => 'Zimbabwe'
        ];

        return array_search($name, $countries) ?: null;
    }
}
