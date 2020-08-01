import React from 'react';

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      className="h-4 text-dark"
      enableBackground="new 0 0 52.966 52.966"
      viewBox="0 0 52.966 52.966"
    >
      <path d="M51.704 51.273L36.845 35.82c3.79-3.801 6.138-9.041 6.138-14.82 0-11.58-9.42-21-21-21s-21 9.42-21 21 9.42 21 21 21c5.083 0 9.748-1.817 13.384-4.832l14.895 15.491a.998.998 0 001.414.028 1 1 0 00.028-1.414zM21.983 40c-10.477 0-19-8.523-19-19s8.523-19 19-19 19 8.523 19 19-8.524 19-19 19z"></path>
    </svg>
  );
}


function SearchBar(){
    return(
        <div class="mt-10 mb-6 my-2 w-full flex justify-center">
          <div class="w-10/12 flex justify-center relative">
            <input type="search" class="shadow bg-white w-full rounded-lg border-0 p-2 pl-10 focus:outline-none focus:shadow-outline focus:border-blue-500" placeholder="Search Friends..." />
            <div class="absolute top-0 left-0 mt-3 pl-3 text-purple-lighter">
             <SearchIcon/>
            </div>
          </div>
        </div>
    )
}

export default SearchBar;