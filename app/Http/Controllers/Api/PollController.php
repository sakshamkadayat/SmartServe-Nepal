<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Poll\PollRequest;
use App\Models\Poll;
use App\Models\PollOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\PollVote;

class PollController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        //getting all the active polls and checking if they are still active or not and updating the status
        $polls = Poll::where('status', 'active')->with('pollOptions')->get();
        if ($polls->isEmpty()) {
            return response()->json([
                'message' => 'No polls available currently',
                'status' => 404
            ]);
        }

        
        $current_time = strtotime(date('Y-m-d H:i:s'));
        foreach ($polls as $poll) {
            $end_time = strtotime($poll->end_date);
            if ($end_time < $current_time) {
                $poll->status = 'off';
                $poll->save();
            }
        }
    
        //getting all the active polls voted and not voted by the user
        $returned_poll_and_vote_data = getUserAssociatedActivePolls();

        return response()->json([
            'message' => 'Polls fetched successfully',
            'status' => 200,
            'user_voted' => $returned_poll_and_vote_data['user_voted'],
            'user_not_voted' => $returned_poll_and_vote_data['user_not_voted'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PollRequest $request)
    {
        // return response()->json($request);
        $validated_data = $request->validated();
        $poll_question = $validated_data['question'];
        $poll_description = $validated_data['description'];
        $poll_end_date = $validated_data['end_date'];
        $poll_options = $validated_data['poll_options'];
        $poll  = Poll::create([
            'question' => $poll_question,
            'description' => $poll_description,
            'end_date' => $poll_end_date,
        ]);

        foreach ($poll_options as $option) {
            $poll->pollOptions()->create([
                'option' => $option['option'],
            ]);
        }

        $created_poll = Poll::where('id', $poll->id)->with('pollOptions')->first();

        return response()->json([
            'message' => 'Poll created successfully',
            'data' => $created_poll,
            'status' => 201,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $poll = Poll::where('id', $id)->where('status', 'active')->with('pollOptions')->first();
        if (!$poll) {
            return response()->json([
                'message' => 'Poll not found',
                'status' => 404
            ]);
        } else {
            return response()->json([
                'message' => 'Poll fetched successfully',
                'status' => 200,
                'data' => $poll
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function vote(Request $request)
    {
        $request->validate([
            'poll_id' => 'required|integer',
            'poll_option_id' => 'required|integer',
        ]);
        // $userId = Auth::user()->id; 
        $userId = 5;
        $pollId = $request->input('poll_id');
        $pollOptionId = $request->input('poll_option_id');
        // Check if the user has already voted for this poll
        $existingVote = PollVote::where('user_id', $userId)
            ->where('poll_id', $pollId)
            ->first();
        if ($existingVote) {
            $poll = Poll::where('id', $pollId)->where('status', 'active')->with('pollOptions')->first();
            return response()->json([
                'message' => 'You have already voted for this poll',
                'status' => 400,
                'data' => $poll
            ]);
        }

        // Create a new poll vote
        $vote = new PollVote();
        $vote->user_id = $userId;
        $vote->poll_id = $pollId;
        $vote->poll_option_id = $pollOptionId;
        $vote->save();

        // Update the vote count for the poll option in a transaction (to handle concurrency)
        DB::transaction(function () use ($pollId, $pollOptionId) {
            // Update the vote count for the poll option
            PollOption::where('id', $pollOptionId)
                ->where('poll_id', $pollId)
                ->update(['votes_count' => DB::raw('votes_count + 1')]);
        });

        $poll = Poll::where('id', $pollId)->where('status', 'active')->with('pollOptions')->first();

        //getting all the active polls voted and not voted by the user
        $returned_poll_and_vote_data = getUserAssociatedActivePolls();

        return response()->json([
            'message' => 'Vote submitted successfully',
            'status' => 200,
            'data' => $poll,
            'user_voted' => $returned_poll_and_vote_data['user_voted'],
            'user_not_voted' => $returned_poll_and_vote_data['user_not_voted'],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Poll $poll)
    {
        //delete only poll whoose status is off
        if($poll->status == 'active'){
            return response()->json([
                'message' => 'Poll cannot be deleted',
                'status' => 400
            ]);
        }
        $poll->delete();
        return response()->json([
            'message' => 'Poll deleted successfully',
            'status' => 200
        ]);
    }


    /**
     * fetch all the polls for the admin
     *
     * 
     * @return \Illuminate\Http\Response
     */
    public function fetchAllPolls()
    {
        $polls = Poll::with('pollOptions')->latest()->get();
        if(!$polls){
            return response()->json([
                'message' => 'Polls not found',
                'status' => 404
            ]);
        }
        return response()->json([
            'message' => 'Polls fetched successfully',
            'status' => 200,
            'data' => $polls
        ]);
    }
}
