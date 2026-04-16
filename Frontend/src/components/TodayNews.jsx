
// import react from "react";

// function TodayNews(){
//     return(
//         <div className='border-gray-200 p-4 rounded-3xl border mt-10'>
//             <h1 className='font-bold text-lg my-4'>Today's News</h1>
//             <div classNmae='flex flex-col'>
//                 <p className='truncate font-bold mb-2 '>
//                     Full stack development refers to the capability of building a complete software application from start to finish, including both the front-end (user interface) and back-end (server logic, database, and API). A full-stack developer handles the entire process, including designing, testing, and deploying, making them versatile engineers
//                 </p>
//                 <div className=' flex items-center'>
//                 <img className='w-8 rounded-full' src='/avatar.png'/>
                
//                 <span className='text-gray-400'> 1 hour ago</span>
//                 </div>
//             </div>

//         </div>
       
//     )
// }

// export default TodayNews;

import React from "react";
import { TrendingUp } from "lucide-react";

const newsItems = [
  {
    tag: "Technology",
    title: "Full-stack development: building apps end-to-end",
    time: "1 hour ago",
    reads: "2.4k",
  },
  {
    tag: "Design",
    title: "Why dark UIs are dominating product design in 2025",
    time: "3 hours ago",
    reads: "5.1k",
  },
  {
    tag: "Dev",
    title: "React 19 ships with new concurrent rendering features",
    time: "5 hours ago",
    reads: "8.7k",
  },
];

function TodayNews() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp size={16} className="text-violet-400" />
        <h2 className="text-white font-bold text-base" style={{ fontFamily: "'Syne', sans-serif" }}>
          Trending
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {newsItems.map((item, i) => (
          <div
            key={i}
            className="group cursor-pointer border-b border-white/[0.05] last:border-none pb-4 last:pb-0"
          >
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">
              {item.tag}
            </span>
            <p className="text-gray-200 text-sm font-medium mt-1 group-hover:text-white transition-colors duration-200 leading-snug"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {item.title}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-600 text-xs">{item.time}</span>
              <span className="text-gray-600 text-xs">·</span>
              <span className="text-gray-600 text-xs">{item.reads} reads</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayNews;
