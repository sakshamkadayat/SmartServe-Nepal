<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class PollOption extends Model
{
    use HasFactory,HasApiTokens,Notifiable;

    protected $fillable = [
        'option',
        'poll_id',
        'votes_count',
    ];

    //relationship with poll
    public function poll(){
        return $this->belongsTo(Poll::class);
    }

    //relationship with poll vote (i.e each option can have many voters)

    public function pollVotes(){
        return $this->hasMany(PollVote::class,'poll_option_id');
    }

}
