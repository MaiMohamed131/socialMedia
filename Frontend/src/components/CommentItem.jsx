// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "./UserContext";
// import ReplyItem from "./ReplyItem";
// import { Loader2, CornerDownRight } from "lucide-react";

// function timeAgo(date) {
//   const diff = Math.floor((Date.now() - new Date(date)) / 1000);
//   if (diff < 60) return `${diff}s ago`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//   return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
// }

// function CommentItem({ comment, onReplyAdded }) {
//   const { user, token } = useUser();
//   const navigate = useNavigate();

//   const [showReplyBox, setShowReplyBox] = useState(false);
//   const [replyText, setReplyText] = useState("");
//   const [replyLoading, setReplyLoading] = useState(false);
//   const [showReplies, setShowReplies] = useState(false);
//   const [replies, setReplies] = useState(comment.replies || []);

//   const goToProfile = () => {
//     const commentUserId = comment.user?._id || comment.user;
//     if (String(commentUserId) === String(user?._id)) {
//       navigate("/profile");
//     } else {
//       navigate(`/users/${commentUserId}`);
//     }
//   };

//   const handleReply = async () => {
//     if (!replyText.trim() || replyLoading) return;
//     setReplyLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/comments/${comment._id}/reply`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ text: replyText.trim() }),
//       });

//       if (!res.ok) throw new Error("Failed to reply");
//       const data = await res.json();

//       // Backend returns the full updated comment with populated replies
//       const newReplies = data.comment?.replies || [];
//       setReplies(newReplies);
//       setReplyText("");
//       setShowReplyBox(false);
//       setShowReplies(true);
//       if (onReplyAdded) onReplyAdded();
//     } catch (e) {
//       console.error("Reply failed", e);
//     } finally {
//       setReplyLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleReply();
//     }
//   };

//   return (
//     <div className="flex gap-3">
//       {/* Avatar */}
//       <button onClick={goToProfile} className="flex-shrink-0 focus:outline-none mt-0.5">
//         <img
//           src={comment.user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
//           alt={comment.user?.name}
//           className="w-8 h-8 rounded-full object-cover ring-2 ring-white/[0.06] hover:ring-violet-500/50 transition-all duration-200"
//           onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//         />
//       </button>

//       <div className="flex-1 min-w-0">
//         {/* Comment bubble */}
//         <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3">
//           <div className="flex items-center gap-2 mb-1.5">
//             <button
//               onClick={goToProfile}
//               className="text-white text-sm font-semibold hover:underline focus:outline-none"
//               style={{ fontFamily: "'DM Sans', sans-serif" }}
//             >
//               {comment.user?.name || "Unknown"}
//             </button>
//             <span className="text-gray-600 text-xs">{timeAgo(comment.createdAt)}</span>
//           </div>
//           <p className="text-gray-200 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//             {comment.text}
//           </p>
//         </div>

//         {/* Action row */}
//         <div className="flex items-center gap-4 mt-1.5 px-1">
//           <button
//             onClick={() => { setShowReplyBox((p) => !p); }}
//             className="flex items-center gap-1 text-gray-500 hover:text-violet-400 text-xs font-semibold transition-colors duration-200"
//             style={{ fontFamily: "'DM Sans', sans-serif" }}
//           >
//             <CornerDownRight size={12} />
//             Reply
//           </button>
//           {replies.length > 0 && (
//             <button
//               onClick={() => setShowReplies((p) => !p)}
//               className="text-violet-400 hover:text-violet-300 text-xs font-semibold transition-colors duration-200"
//               style={{ fontFamily: "'DM Sans', sans-serif" }}
//             >
//               {showReplies ? "Hide" : `View`} {replies.length} {replies.length === 1 ? "reply" : "replies"}
//             </button>
//           )}
//         </div>

//         {/* Reply input */}
//         {showReplyBox && (
//           <div className="mt-2.5 flex gap-2.5 items-start pl-3 border-l-2 border-violet-500/20">
//             <img
//               src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
//               alt="you"
//               className="w-7 h-7 rounded-full object-cover ring-1 ring-white/[0.08] flex-shrink-0 mt-1"
//               onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//             />
//             <div className="flex-1 flex gap-2">
//               <input
//                 type="text"
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 placeholder={`Reply to ${comment.user?.name || ""}…`}
//                 autoFocus
//                 className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 transition-all duration-200"
//                 style={{ fontFamily: "'DM Sans', sans-serif" }}
//               />
//               <button
//                 onClick={handleReply}
//                 disabled={!replyText.trim() || replyLoading}
//                 className="flex-shrink-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1"
//                 style={{ fontFamily: "'DM Sans', sans-serif" }}
//               >
//                 {replyLoading ? <Loader2 size={12} className="animate-spin" /> : "Send"}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Replies list */}
//         {showReplies && replies.length > 0 && (
//           <div className="mt-2 flex flex-col gap-2">
//             {replies.map((reply, idx) => (
//               <ReplyItem key={reply._id || idx} reply={reply} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CommentItem;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import ReplyItem from "./ReplyItem";
import { Loader2, CornerDownRight } from "lucide-react";

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function CommentItem({ comment, onReplyAdded }) {
  const { user, token, authFetch, playReplySound } = useUser();
  const navigate = useNavigate();

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);

  const goToProfile = () => {
    const commentUserId = comment.user?._id || comment.user;
    if (String(commentUserId) === String(user?._id)) {
      navigate("/profile");
    } else {
      navigate(`/users/${commentUserId}`);
    }
  };

  const handleReply = async () => {
    if (!replyText.trim() || replyLoading) return;
    setReplyLoading(true);
    try {
      const res = await authFetch(`http://localhost:5000/comments/${comment._id}/reply`, {
        method: "POST",
        body: JSON.stringify({ text: replyText.trim() }),
      });

      if (!res.ok) throw new Error("Failed to reply");
      const data = await res.json();

      // Backend returns the full updated comment with populated replies
      const newReplies = data.comment?.replies || [];
      playReplySound();
      setReplies(newReplies);
      setReplyText("");
      setShowReplyBox(false);
      setShowReplies(true);
      if (onReplyAdded) onReplyAdded();
    } catch (e) {
      console.error("Reply failed", e);
    } finally {
      setReplyLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReply();
    }
  };

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <button onClick={goToProfile} className="flex-shrink-0 focus:outline-none mt-0.5">
        <img
          src={comment.user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
          alt={comment.user?.name}
          className="w-8 h-8 rounded-full object-cover ring-2 ring-white/[0.06] hover:ring-violet-500/50 transition-all duration-200"
          onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
        />
      </button>

      <div className="flex-1 min-w-0">
        {/* Comment bubble */}
        <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3">
          <div className="flex items-center gap-2 mb-1.5">
            <button
              onClick={goToProfile}
              className="text-white text-sm font-semibold hover:underline focus:outline-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {comment.user?.name || "Unknown"}
            </button>
            <span className="text-gray-600 text-xs">{timeAgo(comment.createdAt)}</span>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {comment.text}
          </p>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-4 mt-1.5 px-1">
          <button
            onClick={() => { setShowReplyBox((p) => !p); }}
            className="flex items-center gap-1 text-gray-500 hover:text-violet-400 text-xs font-semibold transition-colors duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <CornerDownRight size={12} />
            Reply
          </button>
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies((p) => !p)}
              className="text-violet-400 hover:text-violet-300 text-xs font-semibold transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {showReplies ? "Hide" : `View`} {replies.length} {replies.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>

        {/* Reply input */}
        {showReplyBox && (
          <div className="mt-2.5 flex gap-2.5 items-start pl-3 border-l-2 border-violet-500/20">
            <img
              src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
              alt="you"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-white/[0.08] flex-shrink-0 mt-1"
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Reply to ${comment.user?.name || ""}…`}
                autoFocus
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 transition-all duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              <button
                onClick={handleReply}
                disabled={!replyText.trim() || replyLoading}
                className="flex-shrink-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold px-3 py-2 rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {replyLoading ? <Loader2 size={12} className="animate-spin" /> : "Send"}
              </button>
            </div>
          </div>
        )}

        {/* Replies list */}
        {showReplies && replies.length > 0 && (
          <div className="mt-2 flex flex-col gap-2">
            {replies.map((reply, idx) => (
              <ReplyItem key={reply._id || idx} reply={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;

