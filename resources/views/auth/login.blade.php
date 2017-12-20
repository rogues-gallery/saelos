@extends('layouts.app')

@section('content')
    <h1>Welcome Back</h1>
    <form class="form-horizontal" method="POST" action="{{ route('login') }}">
        {{ csrf_field() }}
        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
            <label for="email" class="control-label">Email Address</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus class="form-control" />
            @if ($errors->has('email'))
            <span class="help-block">
                <strong>{{ $errors->first('email') }}</strong>
            </span>
            @endif
        </div>
        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
            <label for="password" class="control-label">Password</label>
            <input id="password" type="password" name="password" class="form-control" required />
            @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>
        <div class="form-group form-group-button">
            <div class="form-group-button-description">
                <a href="{{ route('password.request') }}">Forgot Your Password?</a>
            </div>
            <button type="submit" class="button button-primary button-right">Login</button>
        </div>
    </form>
@endsection
