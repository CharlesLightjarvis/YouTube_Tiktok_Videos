<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('auth-token')->plainTextToken;
            $success['name'] =  $user->name;

            return response()->json([$success, 'User login successfully.'], 200);
        }
        else{
            return response()->json(['Unauthorised.', ['error'=>'Unauthorised']], 401);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }
}
