import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function ReplyItem({ reply }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const goToProfile = () => {
    const replyUserId = reply.user?._id || reply.user;
    if (String(replyUserId) === String(user?._id)) {
      navigate("/profile");
    } else {
      navigate(`/users/${replyUserId}`);
    }
  };

  return (
    <div className="flex gap-2.5 mt-3 pl-3 border-l-2 border-violet-500/20">
      {/* Avatar */}
      <button onClick={goToProfile} className="flex-shrink-0 focus:outline-none">
        <img
          src={reply.user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
          alt={reply.user?.name}
          className="w-7 h-7 rounded-full object-cover ring-1 ring-white/[0.08] hover:ring-violet-500/50 transition-all duration-200"
          onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
        />
      </button>

      <div className="flex-1 min-w-0">
        {/* Bubble */}
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl rounded-tl-sm px-3 py-2">
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={goToProfile}
              className="text-white text-xs font-semibold hover:underline focus:outline-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {reply.user?.name || "Unknown"}
            </button>
            <span className="text-gray-600 text-[10px] flex-shrink-0">
              {timeAgo(reply.createdAt)}
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {reply.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReplyItem;
