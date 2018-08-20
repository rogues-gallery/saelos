<?php

namespace App\Http\Controllers;

use App\Import;
use App\Http\Resources\Import as ImportResource;
use App\Http\Resources\ImportCollection;
use App\Http\Requests\ImportRequest;
use Illuminate\Http\Request;

class ImportController extends Controller
{
    const INDEX_WITH = [
    ];

    const SHOW_WITH = [
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $imports = Import::with(static::INDEX_WITH);

        if ($searchString = $request->get('searchString')) {
            $imports->where('name', 'LIKE', $searchString.'%');
        }

        $imports->orderBy('id');

        return new ImportCollection($imports->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  ImportRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ImportRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $file = $request->file('file');

            if ($file->isValid()) {
                $path = storage_path('/imports/');
                $name = md5(time() . $file->getClientOriginalName()) . '.' . $file->getClientOriginalExtension();
                $file->move($path, $name);

                $import = Import::firstOrNew([
                    'name' => $file->getClientOriginalName(),
                    'filename' => $name,
                    'entity_type' => $data['entity_type'],
                ]);
                
                $import->field_mapping = $data['field_mapping'];

                $import->save();

                return $import;
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Import $import)
    {
        return $import;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  ImportRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ImportRequest $request, Import $import)
    {
        return $this->store($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Import $import)
    {
        return $import->delete();
    }
}
