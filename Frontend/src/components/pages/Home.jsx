
// import react, { useState } from "react";
// import WhatsHappening from "../WhatsHappening";

// function Home(){

//     const [activeTab, setActiveTab] = useState('foryou');
//     return(
//         <div >
//            <div className='border flex items-center
//             justify-around border-b-gray-200 p'> 
//             <button className={`flex-1 text-center py-3  font-semibold ${activeTab==="foryou"? "border-b-4 border-purple-500 font-bold" : "text-gray-800"}`} onClick={() => setActiveTab('foryou')}>For You</button>
//             <button className={`flex-1 text-center py-3  font-semibold ${activeTab==="following"? "border-b-4 border-purple-500 font-bold" : "text-gray-800"}`} onClick={() => setActiveTab('following')}>Following</button>
//            </div>
//            <WhatsHappening/>
//         </div>
       

//     )
// }

// export default Home;

// import React, { useState } from "react";
// import WhatsHappening from "../WhatsHappening";

// function Home() {
//   const [activeTab, setActiveTab] = useState("foryou");

//   return (
//     <div>
//       {/* Header */}
//       <div className="sticky top-0 z-10 backdrop-blur-md bg-[#0f0f13]/80 border-b border-white/[0.06]">
//         <div className="flex">
//           {["foryou", "following"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-4 text-lg font-semibold transition-all duration-200 relative
//                 ${activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
//               style={{ fontFamily: "'DM Sans', sans-serif" }}
//             >
//               {tab === "foryou" ? "For You" : "Following"}
//               {activeTab === tab && (
//                 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Post composer */}
//       <WhatsHappening />

//       {/* Empty feed placeholder */}
//       <div className="flex flex-col items-center justify-center py-20 gap-3">
//         <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center">
//           <span className="text-3xl">✦</span>
//         </div>
//         <p className="text-gray-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//           Posts will appear here
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import WhatsHappening from "../WhatsHappening";
import PostCard from "../PostCard";
import { Loader2 } from "lucide-react";

function Home() {
  const [activeTab, setActiveTab] = useState("foryou");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/posts");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setError("Could not load posts. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = (newPost) => setPosts((prev) => [newPost, ...prev]);
  const handleDelete = (postId) => setPosts((prev) => prev.filter((p) => p._id !== postId));

  return (
    <div>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-[#0f0f13]/80 border-b border-white/[0.06]">
        <div className="flex">
          {["foryou", "following"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 relative
                ${activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {tab === "foryou" ? "For You" : "Following"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <WhatsHappening onNewPost={handleNewPost} />

      {/* Feed */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="animate-spin text-violet-500" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center py-20 gap-3">
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={fetchPosts} className="text-violet-400 text-sm underline hover:text-violet-300">
            Try again
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-3">
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            <span className="text-3xl">✦</span>
          </div>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            No posts yet — be the first!
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default Home;
