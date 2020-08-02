import React from 'react';

function OnlineStatus(){
    return(
        <div class="rounded-full w-2 h-2 mr-2 bg-green-400"></div>
    )    
}

function Header() {
    return (
        <div className="pt-10 pb-2 border-b-2 text-gray-700">
            <div class="flex items-center w-full justify-between">
                <div className="flex flex-row h-full align-top  ">
                    <img class="rounded-full mr-4"
                        style={{ width: "2.5rem", height: "2.5rem" }}
                        src="https://i2-prod.mirror.co.uk/incoming/article5663087.ece/ALTERNATES/s615/Yolande-Pendlebury-main.jpg" alt="Avatar of Jonathan Reinink" />
                    <div className="flex flex-row  items-center">
                        <span class="font-bold pr-3">Jonathan Reinink</span>
                        <OnlineStatus/>
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