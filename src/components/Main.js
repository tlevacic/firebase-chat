import React, { useEffect, useState } from 'react';
import Header from './Header';
import MessageInput from './MessageInput';
import MessageContent from './MessageContent';
import chat from '../public/assets/chat.png';
import moment from 'moment';
const firebase = require("firebase")

function Main(props) {

    const [chats, setChats] = useState(null);
    const [receiver, setReceiver]= useState(null);

    useEffect(() => {
        if (props.id !== null && props.chats !== null && props.chats.length > 0) {
            setChats(props.chats[props.id])
            if(chats){
               setReceiver(chats.users.filter(ele => ele!==props.email)[0])
            }
            let container = document.getElementById("scroll-container");
            container.scrollTo(0, container.scrollHeight);
        }
    })

    const convertDate=(timestamp)=>{
        var time = moment(moment(timestamp).format('YYYYMMDDkkmmss'), 'YYYYMMDDkkmmss').fromNow();
        return time;
    }

    if(!chats){
        return(
            <div className="h-full w-full md:w-7/12 lg:w-8/12 bg-white px-3 relative flex justify-center items-center" id="scroll-container">
                <img className="h-24 w-24" src={chat}/>
            </div> 
        )
    }

    return (
        <div className="h-full w-full md:w-7/12 lg:w-8/12 bg-white px-3 relative">
            <Header isMobile={props.isMobile} showSidebar={props.showSidebar} receiver={receiver} />
            <div className="mt-10 relative " style={{ height: "calc(100vh - 15rem)" }}>
                <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-hidden" id="scroll-container">
                    {chats ?
                        chats.messages.map((ele, ind) => {
                            var date=convertDate(ele.timestamp)
                            return <MessageContent key={ind} message={ele.message} sender={ele.sender} email={props.email} isMobile={props.isMobile} date={date} />
                        }
                        )
                        : <p>No messages</p>}
                </div>
            </div>
            <MessageInput sendMessage={props.sendMessage} />
        </div>
    )
}

export default Main;