<?php

namespace App\Http\Controllers;

use App\Deal;
use App\Document;
use App\Events\DocumentAdded;
use Illuminate\Http\Request;

class DealDocumentController extends Controller
{
    /**
     * @param Request $request
     * @param Deal  $deal
     *
     * @return mixed
     */
    public function store(Request $request, Deal $deal)
    {
        if (!$request->hasFile('document')) {
            return response()->json([
                'success' => false,
                'message' => 'No file uploaded',
            ], 400);
        }

        $file = $request->file('document');

        if (!$file->isValid()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid file upload',
            ], 400);
        }

        $path = public_path('/uploads/');
        $name = md5(time().$file->getClientOriginalName()).'.'.$file->getClientOriginalExtension();
        $size = $file->getSize();
        $mime = $file->getMimeType();

        $file->move($path, $name);

        $document = Document::create([
            'name' => $file->getClientOriginalName(),
            'filename' => $name,
            'size' => $size,
            'mimetype' => $mime,
            'entity_type' => Deal::class,
            'entity_id' => $deal->id,
            'user_id' => \Auth::user()->id,
        ]);

        DocumentAdded::broadcast($document);

        return response()->json([
            'success' => true,
            'message' => 'File uploaded!',
            'file' => $document->toArray(),
        ]);
    }
}
