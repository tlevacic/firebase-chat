import React from 'react';
import send from '../public/assets/send.png';

function MessageInput() {
    return (
        <div className="bottom-0 absolute left-0 right-0 px-3 pb-6 border-t-2 pt-6">
            <div class="flex flex-wrap w-full justify-around align-center">
                <div class="w-9/12">
                    <input class="block w-full py-2 px-2 shadow-lg bg-white text-sm text-gray-700 border border-gray-100 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Write Something"
                    style={{borderRadius: "10px"}} />
                </div>
                <img src={send}/>
            </div>
        </div>
    )
}

export default MessageInput;