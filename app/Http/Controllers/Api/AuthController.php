<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //register
    public function register(RegisterRequest $request){
        $user_data = $request->validated();
        $user_data['password'] = bcrypt($user_data['password']);
        /** @var App\Models\User $user */
        $user = User::create($user_data);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token'=>$token,
            'user'=>$user,
            'message'=>'Registration Successful'
        ]);
    }

    //login
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response()->json([
                'message'=>'Invalid Credentials'
            ],401);
        }
        /** @var App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token'=>$token,
            'user'=>$user,
            'message'=>'Login Successful'
        ]);
    }

    //logout
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message'=>'Logout Successful'
        ],204);
    }

    // //forget password
    // public function forgetPassword(Request $request){
    //     $request->validate([
    //        'email'=>'required|email|exists:users,email'
    //     ]);
    //    $status = Password::sendResetLink(
    //        $request->only('email')
    //    );
    //      return $status === Password::RESET_LINK_SENT
    //              ? response()->json([
    //                   'message'=>'Reset link sent to your email'
    //              ])
    //              : response()->json([
    //                   'message'=>'Unable to send reset link'
    //              ],500);
    // }

    //reset password
    // public function resetPassword(Request $request){
    //     $request->validate([
    //         'token'=>'required',
    //         'email'=>'required|email|exists:users,email',
    //         'password' => [
    //             'required',
    //             'confirmed',
    //             Password::min(8)
    //                 ->letters()
    //                 ->symbols()
    //         ],
    //     ]);
    //     $status = Password::reset(
    //         $request->only('email','password','password_confirmation','token'),
    //         function($user,$password){
    //             $user->forceFill([
    //                 'password'=>bcrypt($password)
    //             ])->setRememberToken(\Illuminate\Support\Str::random(60));
    //             $user->save();
    //         }
    //     );
    //     return $status === Password::PASSWORD_RESET
    //             ? response()->json([
    //                  'message'=>'Password reset successful'
    //             ])
    //             : response()->json([
    //                  'message'=>'Unable to reset password'
    //             ],500);
    // }

    // //update password
    // public function updatePassword(Request $request){
    //     $request->validate([
    //         'current_password'=>'required',
    //         'password' => [
    //             'required',
    //             'confirmed',
    //             Password::min(8)
    //                 ->letters()
    //                 ->symbols()
    //         ],
    //     ]);
    //     $user = $request->user();
    //     if(!Hash::check($request->current_password,$user->password)){
    //         return response()->json([
    //             'message'=>'Current password does not match'
    //         ],401);
    //     }
    //     $user->password = bcrypt($request->password);
    //     $user->save();
    //     return response()->json([
    //         'message'=>'Password updated successfully'
    //     ]);
    // }
}
