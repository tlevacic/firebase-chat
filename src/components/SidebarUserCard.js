import React from 'react';
import bell from '../public/assets/bell.png';

function SidebarUserCard(props){
  const id=props.id;
  const user=props.chat.users.filter(user => user!==props.me)[0];
    return(
      <div className={`flex justify-between mb-6 overflow-hidden py-3 hover:bg-gray-300 px-3 ${props.showBell ? "border-blue-400 border-l-4 " : ""}`}
      onClick={(e) => props.redirect(id)}>
      <div class="flex items-center w-full">
        <img class="rounded-full mr-4"
          style={{ width: "2.5rem", height: "2.5rem" }}
          src="https://i2-prod.mirror.co.uk/incoming/article5663087.ece/ALTERNATES/s615/Yolande-Pendlebury-main.jpg" alt="Avatar of Jonathan Reinink" />
        <div class="text-sm w-10/12">
          <p class="text-blue-500 font-bold text-sm">{user}</p>
          <p class="text-gray-800 text-xs"
          style={{height:"2rem", lineHeight: "1rem"}}>
            {
              props.chat.messages[props.chat.messages.length - 1].message
            }</p>
        </div>
        <div class="h-full ml-2 flex flex-col justify-center">
          <p class="text-gray-600 text-xs">10:30AM</p>
           {props.showBell ? <img src={bell} style={{width: "1.4rem", height:"1.4rem"}}/> : null}
        </div>
      </div>
    </div>
    )
  }


export default SidebarUserCard;