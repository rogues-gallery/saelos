<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="robots" content="noindex">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Saelos</title>

    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    <script>
@if (env('BROADCAST_DRIVER') === 'redis')
        window.ECHO_CONFIG = {
            broadcaster: "socket.io",
            host: "{{ env('REDIS_BROADCAST_URL') }}:{{ env('REDIS_BROADCAST_PORT') }}"
        };
@elseif (env('BROADCAST_DRIVER') === 'pusher')
        window.ECHO_CONFIG = {
            broadcaster: "pusher",
            key: "{{ env('PUSHER_APP_KEY') }}",
            cluster: "{{ env('PUSHER_APP_CLUSTER') }}",
            encrypted: true
        };
@else
        window.ECHO_CONFIG = {
            broadcaster: null
        };
@endif

        window.SAELOS_CONFIG = {
            APP_URL: "{{ env('APP_URL') }}",
@foreach (\App\Settings::where('user_id', '')->orWhereNull('user_id')->get() as $key => $value)
            {{ strtoupper($key) }}: "{{ $value }}",
@endforeach
            BROADCAST_DRIVER: "{{ env('BROADCAST_DRIVER') }}"
        };

        window.i18nextOptions = {
            escapeValue: false,
            defaultNS: "saelos",
            fallbackNS: "saelos",
            debug: {{config('app.debug') ? "true" : "false"}},
            keySeparator: '^',
            ns: {!! i18next_namespaces() !!},
            lng: "en",
            fallbackLng: "en",
            react: {
                wait: true,
            },
            backend: {
                loadPath: "/i18next/fetch/@{{lng}}/@{{ns}}",
                allowMultiloading: false,
                crossDomain: false,
                withCredentials: false
            }
        };
    </script>
</head>
<body>
    <div id="root" class="page-wrapper"></div>
    <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</body>
</html>