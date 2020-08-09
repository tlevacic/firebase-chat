import React from 'react';

function MessageContent(props) {
    const from=props.sender===props.email;
    let styleMessage=from ?  "bg-purple-500 text-white" : " bg-gray-300 text-gray-600";
    let isMobileStyle= props.isMobile ? styleMessage.concat(" rounded-md") : from ? styleMessage.concat(" rounded-tl-full rounded-br-full rounded-bl-full") : styleMessage.concat(" rounded-tr-full rounded-br-full rounded-bl-full");
    const avatarBgStyle=from ? " bg-purple-500" : " bg-gray-300 ";
    const myAvatar= props.email.charAt(0);
    const userAvatar= props.sender.charAt(0);
    const showAvatar=from ? myAvatar : userAvatar;

    return (
        <div className={`flex center items-center justify-end my-4  ${from ? "flex-row" : "flex-row-reverse"}`}>            
            <div>
            <p className={`text-xs text-gray-500 ${from ? " text-right " : " text-left "}`}>{props.date}</p>
                <div className={`px-8 py-2 ${isMobileStyle}`}>
                <p className="text-sm">{props.message}</p>
                </div>
            </div>
           <div className={`hidden md:flex mx-4 rounded-full min-w-6 min-h-6 text-white font-bold  items-center justify-center ${avatarBgStyle}`}>
              <span className="uppercase">{showAvatar}</span>
            </div>
        </div>
    )
}

export default MessageContent;