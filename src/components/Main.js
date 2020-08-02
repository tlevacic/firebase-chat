import React from 'react';
import Header from './Header';
import MessageInput from './MessageInput';
import MessageContent from './MessageContent';

function Main() {
    return (
        <div className="h-full w-full md:w-7/12 lg:w-8/12 bg-white px-3 relative">
            <Header />
            <div className="mt-10 relative " style={{ height: "calc(100vh - 15rem)" }}>
                <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-hidden  ">
                    <MessageContent />
                    <MessageContent from="me" />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent from="me" />
                    <MessageContent from="me" />
                    <MessageContent />
                    <MessageContent from="me" />
                    <MessageContent />
                    <MessageContent from="me" />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent />
                    <MessageContent from="me" />
                    <MessageContent from="me" />
                    <MessageContent />
                    <MessageContent from="me" />
                </div>
            </div>
            <MessageInput />
        </div>
    )
}

export default Main;