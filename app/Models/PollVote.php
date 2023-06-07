<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class PollVote extends Model
{
    use HasFactory,HasApiTokens,Notifiable;

    protected  $fillable = [
        'poll_id',
        'poll_option_id',
        'user_id',
        'status',
    ];
}
