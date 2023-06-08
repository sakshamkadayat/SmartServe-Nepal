
<?php
use App\Models\Poll;    
use Illuminate\Support\Facades\Auth;
use App\Models\User;

if(!function_exists('getUserAssociatedActivePolls')){
    function getUserAssociatedActivePolls(){
        $userId = 5;
        // $userId=Auth::user()->id;
        // $user_with_votes = User::with('pollsVoted')->find($userId);

        //getting all the active polls voted and not voted by the user
        $user_with_votes = User::with('pollsVoted')->find(5);
        foreach ($user_with_votes->pollsVoted as $poll) {
            $votedIds[] = $poll->poll_id;
        }
        $user_voted_active_polls = Poll::where('status', 'active')->whereIn('id', $votedIds)->with('pollOptions')->get();
        $user_not_voted_active_polls = Poll::where('status', 'active')->whereNotIn('id', $votedIds)->with('pollOptions')->get();
        $data = ['user_voted'=>$user_voted_active_polls,'user_not_voted'=>$user_not_voted_active_polls];
        return $data;
    }
}

?>