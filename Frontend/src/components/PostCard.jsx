// import React, { useState } from "react";
// import { Heart, MessageCircle, Trash2, MoreHorizontal } from "lucide-react";
// import { useUser } from "./UserContext";

// function timeAgo(date) {
//   const diff = Math.floor((Date.now() - new Date(date)) / 1000);
//   if (diff < 60) return `${diff}s`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
//   return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
// }

// function PostCard({ post, onDelete }) {
//   const { user, token } = useUser();
//   const [likes, setLikes] = useState(post.likes || []);
//   const [showMenu, setShowMenu] = useState(false);

//   const isLiked = likes.some((l) => (l._id || l) === user?._id);
//   const isOwner = post.user?._id === user?._id || post.user === user?._id;

//   const handleLike = async () => {
//     // Optimistic update
//     setLikes((prev) =>
//       isLiked
//         ? prev.filter((l) => (l._id || l) !== user._id)
//         : [...prev, { _id: user._id }]
//     );
//     try {
//       await fetch(`http://localhost:5000/posts/${post._id}/like`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     } catch (e) {
//       console.error("Like failed", e);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete this post?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/posts/${post._id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok && onDelete) onDelete(post._id);
//     } catch (e) {
//       console.error("Delete failed", e);
//     }
//   };

//   return (
//     <div className="px-5 py-4 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-200 group">
//       <div className="flex gap-3">
//         {/* Avatar */}
//         <img
//           src={post.user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
//           alt={post.user?.name}
//           className="w-10 h-10 rounded-full object-cover ring-2 ring-white/[0.08] flex-shrink-0"
//           onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//         />

//         <div className="flex-1 min-w-0">
//           {/* Header */}
//           <div className="flex items-center justify-between gap-2 mb-1">
//             <div className="flex items-center gap-2 min-w-0">
//               <span className="text-white text-sm font-semibold truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//                 {post.user?.name || "Unknown"}
//               </span>
//               <span className="text-gray-600 text-xs flex-shrink-0">·</span>
//               <span className="text-gray-500 text-xs flex-shrink-0">{timeAgo(post.createdAt)}</span>
//             </div>

//             {/* 3-dot menu — only for post owner */}
//             {isOwner && (
//               <div className="relative">
//                 <button
//                   onClick={() => setShowMenu((p) => !p)}
//                   className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white p-1 rounded-lg hover:bg-white/[0.07] transition-all duration-200"
//                 >
//                   <MoreHorizontal size={16} />
//                 </button>
//                 {showMenu && (
//                   <>
//                     <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
//                     <div className="absolute right-0 top-full mt-1 z-20 bg-[#1a1a24] border border-white/[0.08] rounded-xl shadow-xl overflow-hidden w-36">
//                       <button
//                         onClick={() => { setShowMenu(false); handleDelete(); }}
//                         className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 text-sm transition-colors duration-200"
//                         style={{ fontFamily: "'DM Sans', sans-serif" }}
//                       >
//                         <Trash2 size={14} />
//                         Delete post
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Text */}
//           {post.text && (
//             <p className="text-gray-200 text-[15px] leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//               {post.text}
//             </p>
//           )}

//           {/* Image */}
//           {post.image && (
//             <div className="rounded-xl overflow-hidden border border-white/[0.06] mb-3">
//               <img src={post.image} alt="post" className="w-full max-h-80 object-cover" />
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex items-center gap-5">
//             <button
//               onClick={handleLike}
//               className={`flex items-center gap-1.5 text-sm transition-colors duration-200 group/like
//                 ${isLiked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"}`}
//             >
//               <Heart
//                 size={17}
//                 className={`transition-all duration-200 ${isLiked ? "fill-pink-500 scale-110" : "group-hover/like:scale-110"}`}
//               />
//               <span className="text-xs font-medium">{likes.length > 0 ? likes.length : ""}</span>
//             </button>

//             <button className="flex items-center gap-1.5 text-gray-500 hover:text-violet-400 transition-colors duration-200">
//               <MessageCircle size={17} />
//               <span className="text-xs font-medium">{post.comments?.length > 0 ? post.comments.length : ""}</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PostCard;



// import React, { useState } from "react";
// import { Heart, MessageCircle, Trash2, MoreHorizontal } from "lucide-react";
// import { useUser } from "./UserContext";
// import { useNavigate } from "react-router-dom";
// import CommentSection from "./CommentSection";

// function timeAgo(date) {
//   const diff = Math.floor((Date.now() - new Date(date)) / 1000);
//   if (diff < 60) return `${diff}s`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
//   return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
// }

// const normalizeLikes = (arr) =>
//   (arr || []).map((l) => (typeof l === "object" ? String(l._id || l) : String(l)));

// function PostCard({ post, onDelete }) {
//   const { user, token } = useUser();
//   const navigate = useNavigate();

//   const [likes, setLikes] = useState(normalizeLikes(post.likes));
//   const [likeLoading, setLikeLoading] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [commentCount, setCommentCount] = useState(post.comments?.length || 0);

//   const isLiked = likes.includes(String(user?._id));
//   const isOwner = String(post.user?._id || post.user) === String(user?._id);

//   const goToProfile = (e) => {
//     e.stopPropagation();
//     const ownerId = post.user?._id || post.user;
//     if (String(ownerId) === String(user?._id)) {
//       navigate("/profile");
//     } else {
//       navigate(`/users/${ownerId}`);
//     }
//   };

//   const handleLike = async () => {
//     if (!token || likeLoading) return;
//     setLikes((prev) =>
//       isLiked ? prev.filter((id) => id !== String(user._id)) : [...prev, String(user._id)]
//     );
//     setLikeLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/posts/${post._id}/like`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setLikes(normalizeLikes(data.likes));
//       } else {
//         setLikes(normalizeLikes(post.likes));
//       }
//     } catch {
//       setLikes(normalizeLikes(post.likes));
//     } finally {
//       setLikeLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete this post?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/posts/${post._id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok && onDelete) onDelete(post._id);
//     } catch (e) {
//       console.error("Delete failed", e);
//     }
//   };

//   return (
//     <div className="border-b border-white/[0.06] hover:bg-white/[0.015] transition-colors duration-200 group">
//       <div className="px-5 py-4">
//         <div className="flex gap-3">

//           {/* Clickable avatar */}
//           <button onClick={goToProfile} className="flex-shrink-0 focus:outline-none">
//             <img
//               src={post.user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
//               alt={post.user?.name}
//               className="w-10 h-10 rounded-full object-cover ring-2 ring-white/[0.08] hover:ring-violet-500/50 transition-all duration-200"
//               onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//             />
//           </button>

//           <div className="flex-1 min-w-0">
//             {/* Header */}
//             <div className="flex items-center justify-between gap-2 mb-1">
//               <div className="flex items-center gap-2 min-w-0">
//                 <button
//                   onClick={goToProfile}
//                   className="text-white text-sm font-semibold hover:underline focus:outline-none truncate"
//                   style={{ fontFamily: "'DM Sans', sans-serif" }}
//                 >
//                   {post.user?.name || "Unknown"}
//                 </button>
//                 <span className="text-gray-600 text-xs flex-shrink-0">·</span>
//                 <span className="text-gray-500 text-xs flex-shrink-0">{timeAgo(post.createdAt)}</span>
//               </div>

//               {isOwner && (
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowMenu((p) => !p)}
//                     className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white p-1 rounded-lg hover:bg-white/[0.07] transition-all duration-200"
//                   >
//                     <MoreHorizontal size={16} />
//                   </button>
//                   {showMenu && (
//                     <>
//                       <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
//                       <div className="absolute right-0 top-full mt-1 z-20 bg-[#1a1a24] border border-white/[0.08] rounded-xl shadow-xl overflow-hidden w-36">
//                         <button
//                           onClick={() => { setShowMenu(false); handleDelete(); }}
//                           className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 text-sm transition-colors"
//                           style={{ fontFamily: "'DM Sans', sans-serif" }}
//                         >
//                           <Trash2 size={14} /> Delete post
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>

//             {post.text && (
//               <p className="text-gray-200 text-[15px] leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//                 {post.text}
//               </p>
//             )}

//             {post.image && (
//               <div className="rounded-xl overflow-hidden border border-white/[0.06] mb-3">
//                 <img src={post.image} alt="post" className="w-full max-h-80 object-cover" />
//               </div>
//             )}

//             {/* Actions row */}
//             <div className="flex items-center gap-5">
//               {/* Like */}
//               <button
//                 onClick={handleLike}
//                 disabled={likeLoading}
//                 className={`flex items-center gap-1.5 transition-all duration-200 group/like disabled:opacity-70
//                   ${isLiked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"}`}
//               >
//                 <Heart
//                   size={17}
//                   className={`transition-all duration-200 ${isLiked ? "fill-pink-500 scale-110" : "group-hover/like:scale-110"}`}
//                 />
//                 <span className="text-xs font-medium min-w-[12px]">
//                   {likes.length > 0 ? likes.length : ""}
//                 </span>
//               </button>

//               {/* Comment toggle */}
//               <button
//                 onClick={() => setShowComments((p) => !p)}
//                 className={`flex items-center gap-1.5 transition-colors duration-200
//                   ${showComments ? "text-violet-400" : "text-gray-500 hover:text-violet-400"}`}
//               >
//                 <MessageCircle size={17} className={showComments ? "fill-violet-400/20" : ""} />
//                 <span className="text-xs font-medium min-w-[12px]">
//                   {commentCount > 0 ? commentCount : ""}
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Comment section — slides in when toggled */}
//       {showComments && (
//         <CommentSection
//           postId={post._id}
//           onCommentCountChange={setCommentCount}
//         />
//       )}
//     </div>
//   );
// }

// export default PostCard;


import React, { useState } from "react";
import { Heart, MessageCircle, Trash2, MoreHorizontal } from "lucide-react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const normalizeLikes = (arr) =>
  (arr || []).map((l) => (typeof l === "object" ? String(l._id || l) : String(l)));

function PostCard({ post, onDelete }) {
  const { user, token, authFetch, playLikeSound } = useUser();
  const navigate = useNavigate();

  const [likes, setLikes] = useState(normalizeLikes(post.likes));
  const [likeLoading, setLikeLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments?.length || 0);

  const isLiked = likes.includes(String(user?._id));
  const isOwner = String(post.user?._id || post.user) === String(user?._id);

  const goToProfile = (e) => {
    e.stopPropagation();
    const ownerId = post.user?._id || post.user;
    if (String(ownerId) === String(user?._id)) {
      navigate("/profile");
    } else {
      navigate(`/users/${ownerId}`);
    }
  };

  const handleLike = async () => {
    if (!token || likeLoading) return;
    if (!isLiked) playLikeSound();
    setLikes((prev) =>
      isLiked ? prev.filter((id) => id !== String(user._id)) : [...prev, String(user._id)]
    );
    setLikeLoading(true);
    try {
      const res = await authFetch(`http://localhost:5000/posts/${post._id}/like`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setLikes(normalizeLikes(data.likes));
      } else {
        setLikes(normalizeLikes(post.likes));
      }
    } catch {
      setLikes(normalizeLikes(post.likes));
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const res = await authFetch(`http://localhost:5000/posts/${post._id}`, {
        method: "DELETE",
      });
      if (res.ok && onDelete) onDelete(post._id);
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  return (
    <div className="border-b border-white/[0.06] hover:bg-white/[0.015] transition-colors duration-200 group">
      <div className="px-5 py-4">
        <div className="flex gap-3">

          {/* Clickable avatar */}
          <button onClick={goToProfile} className="flex-shrink-0 focus:outline-none">
            <img
              src={post.user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
              alt={post.user?.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-white/[0.08] hover:ring-violet-500/50 transition-all duration-200"
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
            />
          </button>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  onClick={goToProfile}
                  className="text-white text-sm font-semibold hover:underline focus:outline-none truncate"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {post.user?.name || "Unknown"}
                </button>
                <span className="text-gray-600 text-xs flex-shrink-0">·</span>
                <span className="text-gray-500 text-xs flex-shrink-0">{timeAgo(post.createdAt)}</span>
              </div>

              {isOwner && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu((p) => !p)}
                    className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-white p-1 rounded-lg hover:bg-white/[0.07] transition-all duration-200"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  {showMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                      <div className="absolute right-0 top-full mt-1 z-20 bg-[#1a1a24] border border-white/[0.08] rounded-xl shadow-xl overflow-hidden w-36">
                        <button
                          onClick={() => { setShowMenu(false); handleDelete(); }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-500/10 text-sm transition-colors"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          <Trash2 size={14} /> Delete post
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {post.text && (
              <p className="text-gray-200 text-[15px] leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {post.text}
              </p>
            )}

            {post.image && (
              <div className="rounded-xl overflow-hidden border border-white/[0.06] mb-3">
                <img src={post.image} alt="post" className="w-full max-h-80 object-cover" />
              </div>
            )}

            {/* Actions row */}
            <div className="flex items-center gap-5">
              {/* Like */}
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className={`flex items-center gap-1.5 transition-all duration-200 group/like disabled:opacity-70
                  ${isLiked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"}`}
              >
                <Heart
                  size={17}
                  className={`transition-all duration-200 ${isLiked ? "fill-pink-500 scale-110" : "group-hover/like:scale-110"}`}
                />
                <span className="text-xs font-medium min-w-[12px]">
                  {likes.length > 0 ? likes.length : ""}
                </span>
              </button>

              {/* Comment toggle */}
              <button
                onClick={() => setShowComments((p) => !p)}
                className={`flex items-center gap-1.5 transition-colors duration-200
                  ${showComments ? "text-violet-400" : "text-gray-500 hover:text-violet-400"}`}
              >
                <MessageCircle size={17} className={showComments ? "fill-violet-400/20" : ""} />
                <span className="text-xs font-medium min-w-[12px]">
                  {commentCount > 0 ? commentCount : ""}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment section — slides in when toggled */}
      {showComments && (
        <CommentSection
          postId={post._id}
          onCommentCountChange={setCommentCount}
        />
      )}
    </div>
  );
}

export default PostCard;

