import React from 'react';
import back from '../public/assets/back.png';

function OnlineStatus() {
    return (
        <div class="rounded-full w-2 h-2 mr-2 bg-green-400"></div>
    )
}

function Header(props) {
    const userAvatar = props.receiver && props.receiver.charAt(0);

    return (
        <div className={`pb-2 border-b-2 text-gray-700 ${props.isMobile ? "pt-4 " : "pt-10 "}`}>
            {props.isMobile ?
                <div onClick={(e) => props.showSidebar()}>
                    <img src={back} className="mb-2" style={{ width: "1.4rem", heeight: "1.4rem" }} />
                </div>
                : null}
            <div class="flex items-center w-full justify-between">
                <div className="flex flex-row h-full align-top  ">
                    <div className={`flex mx-4 rounded-full text-purple-500 font-bold bg-gray-300  items-center justify-center`}
                     style={{minWidth:"3rem", minHeight:"3rem"}}>
                        <span className="uppercase ">{userAvatar}</span>
                    </div>
                    <div className="flex flex-row  items-center">
                        <span class="font-bold pr-3">{props.receiver}</span>
                        <OnlineStatus />
                    </div>
                </div>
                <div className="pr-3">
                    <p className="text-gray-500 font-bold text-xs">Zagreb, Croatia</p>
                </div>
            </div>
        </div>
    )
}

export default Header;