import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, CornerDownRight, Loader2, Bell, Check, Trash2 } from "lucide-react";

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const TYPE_CONFIG = {
  like: {
    icon: <Heart size={13} className="fill-pink-500 text-pink-500" />,
    bg: "bg-pink-500/10 border-pink-500/20",
    dot: "bg-pink-500",
    label: (sender) => <><span className="text-white font-semibold">{sender}</span> liked your post</>,
  },
  comment: {
    icon: <MessageCircle size={13} className="text-violet-400" />,
    bg: "bg-violet-500/10 border-violet-500/20",
    dot: "bg-violet-500",
    label: (sender) => <><span className="text-white font-semibold">{sender}</span> commented on your post</>,
  },
  reply: {
    icon: <CornerDownRight size={13} className="text-fuchsia-400" />,
    bg: "bg-fuchsia-500/10 border-fuchsia-500/20",
    dot: "bg-fuchsia-500",
    label: (sender) => <><span className="text-white font-semibold">{sender}</span> replied to your comment</>,
  },
};

function NotificationItem({ notification, onMarkRead, onDelete }) {
  const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.comment;

  const handleClick = () => {
    if (!notification.read) onMarkRead(notification._id);
  };

  return (
    <div
      className={`flex items-start gap-3 px-5 py-4 border-b border-white/[0.05] transition-all duration-200 cursor-pointer group
        ${!notification.read ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"}`}
      onClick={handleClick}
    >
      {/* Sender avatar with type badge */}
      <div className="relative flex-shrink-0">
        <img
          src={notification.sender?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
          alt={notification.sender?.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-white/[0.07]"
          onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
        />
        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border ${config.bg} flex items-center justify-center`}>
          {config.icon}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-gray-300 text-sm leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {config.label(notification.sender?.name || "Someone")}
        </p>
        {notification.post?.text && (
          <p className="text-gray-600 text-xs mt-1 truncate">"{notification.post.text}"</p>
        )}
        <p className="text-gray-600 text-xs mt-1">{timeAgo(notification.createdAt)}</p>
      </div>

      {/* Unread dot + delete */}
      <div className="flex items-center gap-2 flex-shrink-0 mt-1">
        {!notification.read && (
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${config.dot}`} />
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(notification._id); }}
          className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all duration-200 p-1 rounded"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

function Notifications() {
  const { authFetch, socket, setUnreadCount } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Listen for real-time notifications via socket
  useEffect(() => {
    if (!socket) return;

    const handleNew = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnread((c) => c + 1);
      setUnreadCount((c) => c + 1); // update sidebar badge
    };

    socket.on("new_notification", handleNew);
    return () => socket.off("new_notification", handleNew);
  }, [socket]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await authFetch("http://localhost:5000/notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnread(data.unreadCount || 0);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    setNotifications((prev) => prev.map((n) => n._id === id ? { ...n, read: true } : n));
    setUnread((c) => Math.max(0, c - 1));
    setUnreadCount((c) => Math.max(0, c - 1));
    try { await authFetch(`http://localhost:5000/notifications/${id}/read`, { method: "PUT" }); } catch {}
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnread(0);
    setUnreadCount(0);
    try { await authFetch("http://localhost:5000/notifications/read-all", { method: "PUT" }); } catch {}
  };

  const handleDelete = async (id) => {
    const wasUnread = notifications.find((n) => n._id === id && !n.read);
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    if (wasUnread) {
      setUnread((c) => Math.max(0, c - 1));
      setUnreadCount((c) => Math.max(0, c - 1));
    }
    try { await authFetch(`http://localhost:5000/notifications/${id}`, { method: "DELETE" }); } catch {}
  };

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-[#0f0f13]/80 border-b border-white/[0.06] px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
            Notifications
          </h1>
          {unread > 0 && (
            <p className="text-gray-500 text-xs mt-0.5">{unread} unread</p>
          )}
        </div>
        {unread > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <Check size={14} /> Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={22} className="animate-spin text-violet-500" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
            <Bell size={28} className="text-gray-600" />
          </div>
          <div className="text-center">
            <p className="text-gray-400 font-semibold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
              All caught up
            </p>
            <p className="text-gray-600 text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Likes, comments and replies will appear here
            </p>
          </div>
        </div>
      ) : (
        notifications.map((n) => (
          <NotificationItem
            key={n._id}
            notification={n}
            onMarkRead={handleMarkRead}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Notifications;
