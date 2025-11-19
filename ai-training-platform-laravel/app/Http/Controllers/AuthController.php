<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function showSignIn(): View
    {
        return view('auth.signin');
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->scopes(['openid', 'profile', 'email'])
            ->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Check email domain
            $email = $googleUser->getEmail();
            $allowedDomains = ['@thebigsmoke.com.au', '@tbsdigitallabs.com.au'];
            $userDomain = '@' . explode('@', $email)[1] ?? '';
            
            if (!in_array($userDomain, $allowedDomains)) {
                return redirect('/auth/signin')
                    ->with('error', 'Access denied. Please use your @thebigsmoke.com.au or @tbsdigitallabs.com.au email address.');
            }

            // Find or create user
            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'id' => uniqid('user_'),
                    'name' => $googleUser->getName(),
                    'image' => $googleUser->getAvatar(),
                    'email_verified_at' => now(),
                ]
            );

            Auth::login($user, true);

            return redirect('/class-selection');
        } catch (\Exception $e) {
            return redirect('/auth/signin')
                ->with('error', 'An error occurred during sign in. Please try again.');
        }
    }

    public function signOut()
    {
        Auth::logout();
        return redirect('/');
    }
}

