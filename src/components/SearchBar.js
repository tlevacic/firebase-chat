import React from 'react';
import search from '../public/assets/search.png'


function SearchBar(){
    return(
        <div class="mt-4 mb-10 w-full flex justify-center">
          <div class="w-10/12 flex justify-center relative">
            <input type="search" className=" bg-white w-full text-sm rounded-lg border-0 p-1 pl-10 focus:outline-none focus:outline-none focus:border-purple-400 border-2" placeholder="Search" />
            <div class="absolute mt-3 pl-3"
            style={{width:"38px", height:"27px", top:"-8px", left: "-5px"}}>
             <img className="w-full h-full" src={search}/>
            </div>
          </div>
        </div>
    )
}

export default SearchBar;