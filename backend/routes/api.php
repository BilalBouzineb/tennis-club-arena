<?php

use App\Http\Controllers\Api\RankingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    // Game and Ranking related routes
    Route::post('/games', [RankingController::class, 'recordGameResult'])->name('api.games.record');
    Route::get('/rankings/group/{group}', [RankingController::class, 'getGroupRankings'])->name('api.rankings.group'); // {group} will be group ID
    Route::get('/rankings/all', [RankingController::class, 'getAllRankings'])->name('api.rankings.all');
    Route::post('/groups/process-transitions', [RankingController::class, 'runGroupTransitions'])->name('api.groups.transitions');
});
