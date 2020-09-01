import React from 'react';
import back from '../public/assets/back.png';


function Header(props) {
    const userAvatar = props.receiver && props.receiver.charAt(0);

    return (
        <div className={`pb-2 border-b-2 text-gray-700 ${props.isMobile ? "pt-4 " : "pt-10 "}`}>
        
            <div className="flex items-center w-full">
            {props.isMobile ?
                <div onClick={(e) => props.showSidebar()}>
                    <img src={back} className="mb-2 w-7 h-7" />
                </div>
                : null}
                <div className="flex flex-row h-full align-top ">
                    <div className={`flex mx-4 rounded-full bg-purple-700 text-2xl font-bold text-gray-200  items-center justify-center min-w-3 min-h-3`}>
                        <span className="uppercase ">{userAvatar}</span>
                    </div>
                    <div className="flex flex-row  items-center">
                        <span className="font-bold pr-3">{props.receiver}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;