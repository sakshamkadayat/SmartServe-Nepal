<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Poll\PollRequest;
use App\Models\Poll;
use App\Models\PollOption;
use Illuminate\Http\Request;

class PollController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         $polls = Poll::where('status','active')->with('pollOptions')->get();
         if($polls->isEmpty()){
            return response()->json([
                'message'=>'No polls available currently',
                'status'=>404
            ]);
         }

         $active_polls = [];
         $current_time = strtotime(date('Y-m-d H:i:s'));
         foreach($polls as $poll){
            $end_time = strtotime($poll->end_date);
            if($end_time > $current_time){
                $active_polls[] = $poll;
            }else{
                $poll->status = 'off';
                $poll->save();
            }
         }

        // dd($polls, $active_polls);

        return response()->json([
            'message'=>'Polls fetched successfully',
            'status'=>200,
            'data'=>$active_polls
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
        $poll_options = $validated_data['pollData'];
        $poll  = Poll::create([
            'question' => $poll_question,
            'description' => $poll_description,
            'end_date' => $poll_end_date,
        ]);

        foreach ($poll_options as $option) {
            $poll->pollOptions()->create([
                'option' => $option['option'],
                // 'votes_count'=>$option->votes_count,
            ]);
        }

        return response()->json([
            'message' => 'Poll created successfully',
            'data' => $poll,
            'status' => 201,
            'poll_option' => $poll_options
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
        $poll = Poll::where('id',$id)->where('status','active')->with('pollOptions')->first();
        if(!$poll){
            return response()->json([
                'message'=>'Poll not found',
                'status'=>404
            ]);
        }else{
            return response()->json([
                'message'=>'Poll fetched successfully',
                'status'=>200,
                'data'=>$poll
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
