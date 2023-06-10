<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PollController;

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

    //for voting
    // Route::post('polls/vote', [PollController::class, 'vote']);
    //Route::get('/polls/{id}',[PollController::class,'show']);
    //Route::get('/polls',[PollController::class,'index']); 


});
 Route::middleware(['admin','auth:sanctum'])->group(function(){
//Route::delete('/polls/{id}',[PollController::class,'destroy']);
Route::post('/polls',[PollController::class,'store']);
Route::get('/all_polls',[PollController::class, 'fetchAllPolls']);
 });


Route::post("/register",[AuthController::class,'register']);
Route::post("/login",[AuthController::class,'login']);
// Route::post("/forget-password",[AuthController::class,'forgetPassword']);
// Route::post("/reset-password",[AuthController::class,'resetPassword']);


//temporary route for testing
Route::post('polls/vote',[PollController::class,'vote']); //vote
Route::get('/polls',[PollController::class,'index']);    //show all polls
// Route::post('/polls',[PollController::class,'store']);  //create poll
Route::get('/polls/{id}',[PollController::class,'show']); //show poll individual
Route::delete('/polls/{poll}',[PollController::class,'destroy']); //delete poll
//Route::get('/all_polls',[PollController::class, 'fetchAllPolls']); //get all polls
