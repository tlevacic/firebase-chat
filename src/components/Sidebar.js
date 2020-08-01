import React from 'react';
import SearchBar from './SearchBar';
import SidebarUserCard from './SidebarUserCard';

function Sidebar() {
  return (
    <div className="flex max-w-6xl mx-auto my-auto h-screen">
      <div class="bg-gray-100 text-black w-4/12 pt-10">

        <div class="flex justify-between mb-6 px-4">
          <div class="flex items-center">
            <img class="border-blue-500 border-2 rounded-full mr-4"
              style={{ width: "3.5rem", height: "3.5rem" }}
              src="https://i2-prod.mirror.co.uk/incoming/article5663087.ece/ALTERNATES/s615/Yolande-Pendlebury-main.jpg" alt="Avatar of Jonathan Reinink" />
            <div class="text-sm">
              <p class="text-blue-500 font-extrabold">Jonathan Reinink</p>
              <p class="text-gray-600 text-xs">Aug 18</p>
            </div>
          </div>
        </div>

        <SearchBar />
        <SidebarUserCard />
        <SidebarUserCard />
        <SidebarUserCard />

      </div>
    </div>
  )
}

export default Sidebar;