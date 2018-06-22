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
        window.ECHO_CONFIG = false;
@endif
    </script>
</head>
<body>
    <div id="root" class="page-wrapper"></div>
    <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
</body>
</html>