import React from 'react';

function MessageContent({from}) {
    return (
        <div className={`flex center items-center justify-end my-4 ${from=="me" ? "flex-row" : "flex-row-reverse"}`}>
            <div className={`px-4 py-1 rounded-tl-md rounded-tr-md sm:w-full md:w-6/12
             ${from=="me" ? "rounded-bl-md bg-blue-500 text-white" : "rounded-br-md bg-gray-200 text-gray-600"}`}>
                <p className="text-sm">Lorem ipsum some dummy text...
                Lorem ipsum some dummy text...
                Lorem ipsum some dummy text...
                 Lorem ipsum some dummy text...
                Lorem ipsum some dummy text...</p>
            </div>
           <div className="px-2 hidden md:block">
           <img class="rounded-full"
                style={{ width: "1.4rem", height: "1.4rem" }}
                src="https://i2-prod.mirror.co.uk/incoming/article5663087.ece/ALTERNATES/s615/Yolande-Pendlebury-main.jpg" alt="Avatar of Jonathan Reinink" />
           </div>
        </div>
    )
}

export default MessageContent;