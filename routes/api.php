<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::post("/logout",[AuthController::class,'logout']);
    Route::get("/user",function(Request $request){
        $user = $request->user();
        return response()->json([
            'user'=>$user
        ]);
    });

});
// Route::middleware(['admin','auth:sanctum'])->group(function(){
//     Route::get("/users",[AuthController::class,'users']);
//     Route::delete("/user/{id}",[AuthController::class,'deleteUser']);
//     Route::put("/user/{id}",[AuthController::class,'updateUser']);
//     Route::get("/user/{id}",[AuthController::class,'getUser']);
//     Route::post("/user",[AuthController::class,'createUser']);
// });


Route::post("/register",[AuthController::class,'register']);
Route::post("/login",[AuthController::class,'login']);
// Route::post("/forget-password",[AuthController::class,'forgetPassword']);
// Route::post("/reset-password",[AuthController::class,'resetPassword']);
