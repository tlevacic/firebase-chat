import React from 'react';
import Header from './Header';
import MessageInput from './MessageInput';

function Main() {
    return (
        <div className="h-full w-full md:w-7/12 lg:w-8/12 bg-white px-3 relative">
            <Header/>
            <MessageInput/>
        </div>
    )
}

export default Main;