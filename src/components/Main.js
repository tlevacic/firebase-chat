import React, {useEffect, useState} from 'react';
import Header from './Header';
import MessageInput from './MessageInput';
import MessageContent from './MessageContent';
const firebase= require("firebase")

function Main(props) {
    const [chats, setChats] = useState(null);

    useEffect(()=>{
        if(props.id!==null && props.chats!==null && props.chats.length>0) {
            setChats(props.chats[props.id])
            let container=document.getElementById("scroll-container");
            container.scrollTo(0,container.scrollHeight);
        }
    })
    return (
        <div className="h-full w-full md:w-7/12 lg:w-8/12 bg-white px-3 relative">
            <Header />
            <div className="mt-10 relative " style={{ height: "calc(100vh - 15rem)" }}>
                <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-hidden" id="scroll-container">
                    {chats ? 
                     chats.messages.map((ele,ind) =>
                        <MessageContent key={ind} message={ele.message} sender={ele.sender} email={props.email}/>
                     )
                     : <p>No messages</p>}
                </div>
            </div>
            <MessageInput sendMessage={props.sendMessage}/>
        </div>
    )
}

export default Main;