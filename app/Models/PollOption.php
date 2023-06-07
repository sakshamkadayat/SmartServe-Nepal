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

    public function poll(){
        return $this->belongsTo(Poll::class);
    }
}
