<?php

namespace App\Http\Requests\Poll;

use Illuminate\Foundation\Http\FormRequest;

class PollRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'question'=>'required|string',
            'description'=>'required|string',
            'end_date'=> 'required|date|date_format:Y-m-d H:i:s|after:tomorrow',  //allow only future dates
            'poll_options'=>'required|array|min:2',
            'poll_options.*.option'=>'required|string',
        ];
    }
}
