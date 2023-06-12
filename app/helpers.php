
<?php
use App\Models\Poll;    
use Illuminate\Support\Facades\Auth;
use App\Models\User;

if(!function_exists('getUserAssociatedActivePolls')){
    
    function getUserAssociatedActivePolls(){
    
        $userId=Auth::user()->id;
        //getting all the active polls voted and not voted by the user
         $user_with_votes = User::with('pollsVoted')->find($userId);
        //  if(empty($user_with_votes->pollsVoted)){
        //     $user_not_voted_active_polls = Poll::where('status','active')->with('pollOptions')->get();
        //     $user_voted_active_polls = collect([]);
        //     $data = ['user_voted'=>$user_voted_active_polls,'user_not_voted'=>$user_not_voted_active_polls];

        //     return $data;
        //  }
         $votedIds = [];
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