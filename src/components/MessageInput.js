import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import send from '../public/assets/send.png';

function MessageInput(props) {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = values => {
        props.sendMessage(values.message);
    };

    return (
        <div className="bottom-0 absolute left-0 right-0 px-3 pb-6 border-t-2 pt-6">
            <div className="flex flex-wrap w-full justify-around align-center">
                <div className="w-full md:w-11/12">
                    {<p className="text-xs text-center text-red-500">
                        {errors.message && errors.message.message}
                    </p>}
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-row">
                        <input
                            id="message-input"
                            className="block rounded-10px w-full py-2 px-2 shadow-lg bg-white text-sm text-gray-700 border border-gray-100 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Write Something"
                            name="message"
                            ref={register({
                                required: "Field is required",
                            })}/>
                        <button type="submit" className="ml-2">
                            <img src={send} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MessageInput;