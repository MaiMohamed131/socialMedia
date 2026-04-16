// import { Search } from "lucide-react";
// import react from "react";

// function SearchBox(){
//     return(
//         <div className='mt-6'>
//             <div className='relative'>

//           <Search className='absolute top-1/2 left-4 transform 
//           -translate-y-1/2 text-gray-500 w-5 h-5'/> 
//           <input placeholder='Search...' className='border-gray-400 shadow-md rounded-3xl p-4 outline-none w-full pl-12 pr-4 py-2'/>
//           </div>
//         </div>
//     )
// }

// export default SearchBox;

import { Search } from "lucide-react";
import React from "react";

function SearchBox() {
  return (
    <div className="relative mt-2">
      <Search className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
      <input
        placeholder="Search Pulse..."
        className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
    </div>
  );
}

export default SearchBox;
