<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Client;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected function authenticated(Request $request, $user)
    {
        try {
            $http = new Client;

            $response = $http->post(env('APP_URL') . '/oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => env('PASSWORD_CLIENT_ID'),
                    'client_secret' => env('PASSWORD_CLIENT_SECRET'),
                    'username' => $request->get('email'),
                    'password' => $request->get('password'),
                    'remember' => $request->get('remember'),
                    'scope' => $user->roleScopeString(),
                ],
            ]);

            return json_decode((string)$response->getBody(), true);
        } catch (\Exception $e) {
            return $this->sendFailedLoginResponse($request);
        }
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);

        return $this->authenticated($request, $this->guard()->user())
            ?: redirect()->intended($this->redirectPath());
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        return response()->json([
            'error' => 'invalid_credentials',
            'message' => "Authentication Error"
        ], 401);
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->token();

        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();

        return response()->json([], 201);
    }
}
