import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import SidebarUserCard from './SidebarUserCard';
import pen from '../public/assets/pen.png';
import plus from '../public/assets/plus.png'

function Sidebar(props) {
  const chats = props.chats;

  const dashboardRedirect = (index) => {
    props.redirect(index);
  }

  const userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === props.email;


  return (
    <div class="bg-gray-100 text-black w-full md:w-5/12 lg:w-4/12 pt-10 relative">
      <div class="flex justify-between mb-6 px-4">
        <div class="flex items-center w-full justify-between">
          <div className="flex flex-row h-full align-top  ">
            <img class="border-blue-500 border-2 rounded-full mr-4"
              style={{ width: "3.5rem", height: "3.5rem" }}
              src="https://i2-prod.mirror.co.uk/incoming/article5663087.ece/ALTERNATES/s615/Yolande-Pendlebury-main.jpg" alt="Avatar of Jonathan Reinink" />
            <div class="text-sm">
              <p class="text-blue-500 font-extrabold">Jonathan Reinink</p>
              <p class="text-gray-600 text-xs">Aug 18</p>
            </div>
          </div>
          <div style={{ width: "1rem", height: "1rem" }}>
            <img
              className="w-full h-full"
              src={pen} />
          </div>
        </div>
      </div>
      <div className="absolute z-10 bottom-0 mb-10 left-0 ml-4 bg-white rounded-full w-16 h-16">
        <img src={plus} className="w-full h-full rounded-full" />
      </div>

      <SearchBar />
      <div className="relative"
        style={{ height: "calc(100vh - 15rem)" }}>
        <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-x-hidden">
          {
            chats ? chats.map((_chat, _index) => {
              let showBell = false;
              if (_chat.receiverHasRead === false && !userIsSender(_chat))
                showBell = true;
              return (
                <SidebarUserCard
                  isMobile={props.isMobile}
                  history={props.history}
                  key={_index}
                  id={_index}
                  chat={_chat}
                  me={props.email}
                  redirect={dashboardRedirect}
                  showBell={showBell} />
              )
            }) : <p>Loading</p>
          }
        </div>
      </div>

    </div>
  )
}

export default Sidebar;