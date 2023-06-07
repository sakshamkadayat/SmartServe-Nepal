<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Poll extends Model
{
    use HasFactory,HasApiTokens,Notifiable;

    protected $fillable = [
        'question',
        'description',
        'end_date',
        'status'
    ];

    //one to many relationship with poll options
    public function pollOptions(){
        return $this->hasMany(PollOption::class);
    }
}
