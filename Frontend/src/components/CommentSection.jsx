// import React, { useState, useEffect, useRef } from "react";
// import { useUser } from "./UserContext";
// import CommentItem from "./CommentItem";
// import { Loader2, Send } from "lucide-react";

// function CommentSection({ postId, onCommentCountChange }) {
//   const { user, token } = useUser();
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [text, setText] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     fetchComments();
//   }, [postId]);

//   const fetchComments = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/comments/${postId}`);
//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         console.error("Comment failed:", res.status, errData.message || "Unknown error");
//         throw new Error(errData.message || "Failed");
//       }
//       const data = await res.json();
//       setComments(data.comments || []);
//       if (onCommentCountChange) onCommentCountChange(data.comments?.length || 0);
//     } catch {
//       setComments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleComment = async () => {
//     if (!text.trim() || submitting) return;
//     setSubmitting(true);
//     try {
//       const res = await fetch(`http://localhost:5000/comments/${postId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ text: text.trim() }),
//       });
//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         console.error("Comment failed:", res.status, errData.message || "Unknown error");
//         throw new Error(errData.message || "Failed");
//       }
//       const data = await res.json();

//       // Prepend new comment with full user data injected
//       const newComment = {
//         ...data.comment,
//         user: {
//           _id: user._id,
//           name: user.name,
//           avatar: user.avatar,
//         },
//         replies: [],
//       };

//       setComments((prev) => [newComment, ...prev]);
//       setText("");
//       if (onCommentCountChange) onCommentCountChange(comments.length + 1);
//       inputRef.current?.focus();
//     } catch (err) {
//       console.error("Comment error:", err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleComment();
//     }
//   };

//   return (
//     <div className="mt-1 pt-3 border-t border-white/[0.06]">
//       {/* Comment input */}
//       <div className="flex gap-3 mb-4 px-5">
//         <img
//           src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
//           alt="you"
//           className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/20 flex-shrink-0 mt-0.5"
//           onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//         />
//         <div className="flex-1 flex gap-2">
//           <input
//             ref={inputRef}
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Write a comment…"
//             className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all duration-200"
//             style={{ fontFamily: "'DM Sans', sans-serif" }}
//           />
//           <button
//             onClick={handleComment}
//             disabled={!text.trim() || submitting}
//             className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-violet-500/20"
//           >
//             {submitting
//               ? <Loader2 size={15} className="animate-spin text-white" />
//               : <Send size={15} className="text-white" />
//             }
//           </button>
//         </div>
//       </div>

//       {/* Comments list */}
//       {loading ? (
//         <div className="flex justify-center py-6">
//           <Loader2 size={18} className="animate-spin text-violet-500" />
//         </div>
//       ) : comments.length === 0 ? (
//         <p className="text-center text-gray-600 text-sm py-4 px-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//           No comments yet — start the conversation
//         </p>
//       ) : (
//         <div className="flex flex-col gap-4 px-5 pb-2">
//           {comments.map((comment) => (
//             <CommentItem
//               key={comment._id}
//               comment={comment}
//               onReplyAdded={() => {}} // could update count if needed
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default CommentSection;


import React, { useState, useEffect, useRef } from "react";
import { useUser } from "./UserContext";
import CommentItem from "./CommentItem";
import { Loader2, Send } from "lucide-react";

function CommentSection({ postId, onCommentCountChange }) {
  const { user, token, authFetch, playCommentSound } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/comments/${postId}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("Comment failed:", res.status, errData.message || "Unknown error");
        throw new Error(errData.message || "Failed");
      }
      const data = await res.json();
      setComments(data.comments || []);
      if (onCommentCountChange) onCommentCountChange(data.comments?.length || 0);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async () => {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await authFetch(`http://localhost:5000/comments/${postId}`, {
        method: "POST",
        body: JSON.stringify({ text: text.trim() }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("Comment failed:", res.status, errData.message || "Unknown error");
        throw new Error(errData.message || "Failed");
      }
      const data = await res.json();

      // Prepend new comment with full user data injected
      const newComment = {
        ...data.comment,
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        },
        replies: [],
      };

      playCommentSound();
      setComments((prev) => [newComment, ...prev]);
      setText("");
      if (onCommentCountChange) onCommentCountChange(comments.length + 1);
      inputRef.current?.focus();
    } catch (err) {
      console.error("Comment error:", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  return (
    <div className="mt-1 pt-3 border-t border-white/[0.06]">
      {/* Comment input */}
      <div className="flex gap-3 mb-4 px-5">
        <img
          src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
          alt="you"
          className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/20 flex-shrink-0 mt-0.5"
          onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
        />
        <div className="flex-1 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a comment…"
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 focus:bg-white/[0.06] transition-all duration-200"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
          <button
            onClick={handleComment}
            disabled={!text.trim() || submitting}
            className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-violet-500/20"
          >
            {submitting
              ? <Loader2 size={15} className="animate-spin text-white" />
              : <Send size={15} className="text-white" />
            }
          </button>
        </div>
      </div>

      {/* Comments list */}
      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 size={18} className="animate-spin text-violet-500" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center text-gray-600 text-sm py-4 px-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          No comments yet — start the conversation
        </p>
      ) : (
        <div className="flex flex-col gap-4 px-5 pb-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReplyAdded={() => {}} // could update count if needed
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;

