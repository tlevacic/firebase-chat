import React from 'react';
import bell from '../public/assets/bell.png';
import moment from 'moment';

function SidebarUserCard(props) {
  const id = props.id;
  const user = props.chat.users.filter(user => user !== props.me)[0];
  const lastMessageObject = props.chat.messages[props.chat.messages.length - 1];

  const convertDate = (timestamp) => {
    var time = moment(moment(timestamp).format('YYYYMMDDkkmmss'), 'YYYYMMDDkkmmss').fromNow();
    return time;
  }

  return (
    <div className={`flex justify-between bg-white mb-3 overflow-hidden px-3 rounded-lg w-11/12 mx-auto py-2 shadow-2xl border-gray-100 border-r-2 ${props.showBell && "border-purple-500"}`}
      onClick={(e) => props.redirect(id)}>

      <div className="flex items-center w-full">
        <div className="rounded-full text-white font-extrabold bg-purple-600 items-center uppercase flex justify-center min-w-2.5 h-2.5 mr-2">
          {user && user.charAt(0)}
        </div>
        <div className="text-sm w-10/12">
          <p className={`font-bold text-sm ${props.showBell ? "text-black " : "text-gray-600"}`}>{user}</p>
          <p className="text-gray-800 text-xs pt-2 h-8 leading-1">
            {
              props.chat.messages[props.chat.messages.length - 1].message
            }</p>
        </div>
        <div className="h-full ml-2 flex flex-col justify-around items-end">
          {props.showBell ? <img src={bell} className="w-4 h-4" /> : null}
          <p className="text-gray-500 text-xs">{convertDate(lastMessageObject.timestamp)}</p>
        </div>
      </div>
    </div>
  )
}


export default SidebarUserCard;