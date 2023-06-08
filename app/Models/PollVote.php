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
    ];

    //relationship with pollOption
    public function pollOption(){
        return $this->belongsTo(PollOption::class);
    }

    //relationship with user
    public function user(){
        return $this->belongsTo(User::class);
    }
}
