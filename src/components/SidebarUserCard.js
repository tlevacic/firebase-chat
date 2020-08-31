import React from 'react';
import bell from '../public/assets/bell.png';
import moment from 'moment';

function SidebarUserCard(props){
  const id=props.id;
  const user=props.chat.users.filter(user => user!==props.me)[0];
  const lastMessageObject= props.chat.messages[props.chat.messages.length - 1];

  const convertDate=(timestamp)=>{
    var time = moment(moment(timestamp).format('YYYYMMDDkkmmss'), 'YYYYMMDDkkmmss').fromNow();
    return time;
 }

    return(
      <div className={`flex justify-between bg-white mb-3 overflow-hidden px-3 rounded-lg w-11/12 mx-auto py-2 shadow-2xl border-gray-100 border-r-2 ${props.showBell && "border-purple-500" }`}
            onClick={(e) => props.redirect(id)}>

      <div className="flex items-center w-full">
      <div className="rounded-full text-white font-extrabold bg-purple-600 items-center flex justify-center mr-2" style={{minWidth: "2.5rem", height:"2.5rem",}}>
              B
       </div>
        <div className="text-sm w-10/12">
          <p className={`font-bold text-sm ${props.showBell ? "text-black " : "text-gray-600"}`}>{user}</p>
          <p className="text-gray-800 text-xs pt-2"
          style={{height:"2rem", lineHeight: "1rem"}}>
            {
              props.chat.messages[props.chat.messages.length - 1].message
            }</p>
        </div>
        <div className="h-full ml-2 flex flex-col justify-around items-end">
        {props.showBell ? <img src={bell} style={{width: "1rem", height:"1rem"}}/> : null}
          <p className="text-gray-500" style={{fontSize:".7rem"}}>{convertDate(lastMessageObject.timestamp)}</p>
        </div>
      </div>
    </div>
    )
  }


export default SidebarUserCard;