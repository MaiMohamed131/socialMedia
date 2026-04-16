
// import react from "react";
// import SearchBox from "./SearchBox";
// import TodayNews from "./TodayNews";

// function RightSideBar(){
//     return(
//         <div className='hidden md:flex flex-col w-96 p-4 border-gray-200
//          h-screen sticky top-6'>
//            <SearchBox/>
//            <TodayNews/>
//         </div>
//     )
// }

// export default RightSideBar;
import React from "react";
import SearchBox from "./SearchBox";
import TodayNews from "./TodayNews";

function RightSideBar() {
  return (
    <div className="hidden lg:flex flex-col w-88 p-5 h-screen sticky top-0 gap-5 overflow-y-auto">
      <SearchBox />
      <TodayNews />
      {/* Who to follow */}
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
        <h2 className="text-white font-bold text-base mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          Who to Follow
        </h2>
        {[
          { name: "Alex Rivera", handle: "alexr", avatar: null },
          { name: "Mia Chen", handle: "miachen", avatar: null },
          { name: "Jordan Lee", handle: "jlee", avatar: null },
        ].map((u) => (
          <div key={u.handle} className="flex items-center gap-3 py-3 border-b border-white/[0.05] last:border-none">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 flex items-center justify-center text-white text-sm font-bold">
              {u.name[0]}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white text-sm font-semibold truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>{u.name}</span>
              <span className="text-gray-500 text-xs">@{u.handle}</span>
            </div>
            <button className="text-xs font-semibold text-violet-400 border border-violet-500/40 px-3 py-1 rounded-full hover:bg-violet-500/10 transition-colors duration-200">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RightSideBar;
