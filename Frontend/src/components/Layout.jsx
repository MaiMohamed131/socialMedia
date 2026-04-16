
// import react from "react";
// import LeftSideBar from "./LeftSideBar";
// import RightSideBar from "./RightSideBar";

// function Layout({children}){
//     return(
//         <div className=' flex max-w-7xl mx-auto'>
//             <LeftSideBar/>
//             <main className='flex-1 border-x border-gray-50 min-h-screen'>
//               {children}  
//             </main>
           
//            <RightSideBar/>
//         </div>
//     )
// }

// export default Layout;

import React from "react";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0f0f13]">
      <div className="flex max-w-7xl mx-auto">
        <LeftSideBar />
        <main className="flex-1 border-x border-white/[0.1] min-h-screen">
          {children}
        </main>
        <RightSideBar />
      </div>
    </div>
  );
}

export default Layout;
