import React from 'react';

function SidebarUserCard(){
    return(
      <div class="flex justify-between mb-6 overflow-hidden pt-2 hover:bg-gray-300">
      <div class="flex items-center">
        <img class="rounded-full mr-4"
          style={{ width: "2.5rem", height: "2.5rem" }}
          src="https://i2-prod.mirror.co.uk/incoming/article5663087.ece/ALTERNATES/s615/Yolande-Pendlebury-main.jpg" alt="Avatar of Jonathan Reinink" />
        <div class="text-sm w-10/12">
          <p class="text-blue-500 font-bold text-sm">Jonathan Reinink</p>
          <p class="text-gray-800 text-xs"
          style={{height:"2rem", lineHeight: "1rem"}}>
            Lorem Ipsum neka recenica text nesto Lorem Ipsum neka recenica text nesto</p>
        </div>
        <div class="h-full ml-2">
          <p class="text-gray-600 text-xs">10:30AM</p>
        </div>
      </div>
    </div>
    )
  }


export default SidebarUserCard;