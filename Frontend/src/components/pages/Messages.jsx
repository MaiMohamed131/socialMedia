import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../UserContext";
import { Send, Loader2, Search, ArrowLeft, MessageCircle } from "lucide-react";

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

// ─── Conversation List Item ───────────────────────────────────────────────────
function ConvItem({ conv, currentUserId, isActive, onClick }) {
  const other = conv.participants?.find((p) => p._id !== currentUserId) || conv.participants?.[0];
  const unread = conv.unread || 0;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 rounded-xl
        ${isActive ? "bg-violet-500/15" : "hover:bg-white/[0.04]"}`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={other?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
          alt={other?.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-white/[0.07]"
          onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
        />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-violet-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-sm font-semibold truncate ${unread > 0 ? "text-white" : "text-gray-300"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {other?.name || "Unknown"}
          </span>
          {conv.lastMessage?.createdAt && (
            <span className="text-gray-600 text-[10px] flex-shrink-0">
              {timeAgo(conv.lastMessage.createdAt)}
            </span>
          )}
        </div>
        {conv.lastMessage?.text && (
          <p className={`text-xs truncate mt-0.5 ${unread > 0 ? "text-violet-300 font-medium" : "text-gray-500"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {conv.lastMessage.sender?.toString() === currentUserId ? "You: " : ""}
            {conv.lastMessage.text}
          </p>
        )}
      </div>
    </button>
  );
}

// ─── Single Message Bubble ─────────────────────────────────────────────────────
function MessageBubble({ msg, isOwn }) {
  return (
    <div className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
      {!isOwn && (
        <img
          src={msg.sender?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
          alt={msg.sender?.name}
          className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1"
          onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
        />
      )}
      <div className={`max-w-[70%] flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
          ${isOwn
            ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-br-sm"
            : "bg-white/[0.07] border border-white/[0.08] text-gray-200 rounded-bl-sm"
          }`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {msg.text}
        </div>
        <span className="text-gray-600 text-[10px] px-1">{formatTime(msg.createdAt)}</span>
      </div>
    </div>
  );
}

// ─── Chat Window ──────────────────────────────────────────────────────────────
function ChatWindow({ otherUserId, onBack }) {
  const { user, authFetch, socket, playMessageSound } = useUser();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const other = conversation?.participants?.find((p) => p._id !== user?._id);

  useEffect(() => {
    fetchConversation();
  }, [otherUserId]);

  // Listen for incoming messages in this conversation
  useEffect(() => {
    if (!socket) return;
    const handle = (msg) => {
      if (msg.sender?._id === otherUserId || msg.sender === otherUserId) {
        setMessages((prev) => [...prev, msg]);
        // Mark as read since window is open
        authFetch(`http://localhost:5000/messages/${otherUserId}/read`, { method: "PUT" }).catch(() => {});
      }
    };
    socket.on("new_message", handle);
    return () => socket.off("new_message", handle);
  }, [socket, otherUserId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversation = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`http://localhost:5000/messages/${otherUserId}`);
      const data = await res.json();
      setConversation(data.conversation);
      setMessages(data.conversation?.messages || []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSend = async () => {
    if (!text.trim() || sending) return;
    const optimistic = {
      _id: Date.now().toString(),
      sender: { _id: user._id, name: user.name, avatar: user.avatar },
      text: text.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };
    setMessages((prev) => [...prev, optimistic]);
    setText("");
    setSending(true);
    try {
      const res = await authFetch(`http://localhost:5000/messages/${otherUserId}`, {
        method: "POST",
        body: JSON.stringify({ text: optimistic.text }),
      });
      if (res.ok) {
        const data = await res.json();
        // Replace optimistic message with real one
        setMessages((prev) => prev.map((m) => m._id === optimistic._id ? data.message : m));
      }
    } catch {
      // Remove optimistic on failure
      setMessages((prev) => prev.filter((m) => m._id !== optimistic._id));
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
        <button onClick={onBack} className="lg:hidden text-gray-400 hover:text-white transition-colors p-1">
          <ArrowLeft size={20} />
        </button>
        {loading ? (
          <div className="w-9 h-9 rounded-full bg-white/[0.05] animate-pulse" />
        ) : (
          <img
            src={other?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
            alt={other?.name}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/20"
            onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
          />
        )}
        <div>
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {other?.name || "..."}
          </p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 size={20} className="animate-spin text-violet-500" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 opacity-60">
            <MessageCircle size={36} className="text-gray-600" />
            <p className="text-gray-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Start the conversation
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              msg={msg}
              isOwn={String(msg.sender?._id || msg.sender) === String(user?._id)}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-white/[0.06] flex gap-3 flex-shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message…"
          className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || sending}
          className="w-11 h-11 flex-shrink-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-violet-500/20"
        >
          {sending
            ? <Loader2 size={16} className="animate-spin text-white" />
            : <Send size={16} className="text-white" />
          }
        </button>
      </div>
    </div>
  );
}

// ─── Main Messages Page ───────────────────────────────────────────────────────
function Messages() {
  const { user, authFetch, socket, setUnreadMessages } = useUser();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeUserId, setActiveUserId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  // New message arrives — update conversation list preview + badge
  useEffect(() => {
    if (!socket) return;
    const handle = (msg) => {
      setConversations((prev) => {
        const senderId = msg.sender?._id || msg.sender;
        const exists = prev.find((c) =>
          c.participants.some((p) => (p._id || p) === senderId)
        );
        if (exists) {
          return prev.map((c) => {
            const isThis = c.participants.some((p) => (p._id || p) === senderId);
            if (!isThis) return c;
            // If chat is open with this person, don't increment unread
            const isOpen = activeUserId === senderId;
            return {
              ...c,
              lastMessage: { text: msg.text, sender: senderId, createdAt: msg.createdAt },
              unread: isOpen ? c.unread : (c.unread || 0) + 1,
            };
          });
        } else {
          // New conversation — refetch
          fetchConversations();
          return prev;
        }
      });

      // Only increment global badge if chat is not open
      if (activeUserId !== (msg.sender?._id || msg.sender)) {
        setUnreadMessages((p) => p + 1);
      }
    };
    socket.on("new_message", handle);
    return () => socket.off("new_message", handle);
  }, [socket, activeUserId]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const res = await authFetch("http://localhost:5000/messages");
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch {} finally {
      setLoading(false);
    }
  };

  const handleOpenConv = (otherUserId) => {
    setActiveUserId(otherUserId);
    // Clear unread for this conversation locally
    setConversations((prev) =>
      prev.map((c) => {
        const isThis = c.participants.some((p) => (p._id || p) === otherUserId);
        return isThis ? { ...c, unread: 0 } : c;
      })
    );
    // Recalculate global badge
    setUnreadMessages((prev) => {
      const conv = conversations.find((c) =>
        c.participants.some((p) => (p._id || p) === otherUserId)
      );
      return Math.max(0, prev - (conv?.unread || 0));
    });
  };

  // Search users to start a new conversation
  const handleSearch = async (q) => {
    setSearch(q);
    if (!q.trim()) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const res = await authFetch(`http://localhost:5000/users/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults((data.users || []).filter((u) => u._id !== user._id));
      }
    } catch {} finally {
      setSearching(false);
    }
  };

  const filtered = conversations.filter((c) => {
    const other = c.participants?.find((p) => p._id !== user?._id);
    return other?.name?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Conversation list panel */}
      <div className={`flex flex-col border-r border-white/[0.06] transition-all duration-200
        ${activeUserId ? "hidden lg:flex w-80" : "flex flex-1 lg:flex-none lg:w-80"}`}>

        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-white/[0.06]">
          <h1 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
            Messages
          </h1>
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search or start new chat…"
              className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-violet-500/40 transition-all duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {/* Search results */}
          {search && searchResults.length > 0 && (
            <div className="mb-3">
              <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-2 mb-1">
                Users
              </p>
              {searchResults.map((u) => (
                <button
                  key={u._id}
                  onClick={() => { handleOpenConv(u._id); setSearch(""); setSearchResults([]); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] rounded-xl transition-all duration-200"
                >
                  <img src={u.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
                    alt={u.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-white/[0.07]"
                    onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
                  />
                  <span className="text-gray-200 text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {u.name}
                  </span>
                </button>
              ))}
              <div className="h-px bg-white/[0.06] mx-2 my-2" />
            </div>
          )}

          {/* Conversations */}
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 size={18} className="animate-spin text-violet-500" />
            </div>
          ) : filtered.length === 0 && !search ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 opacity-60">
              <MessageCircle size={32} className="text-gray-600" />
              <p className="text-gray-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No conversations yet
              </p>
            </div>
          ) : (
            filtered.map((conv) => {
              const other = conv.participants?.find((p) => p._id !== user?._id);
              return (
                <ConvItem
                  key={conv._id}
                  conv={conv}
                  currentUserId={user?._id}
                  isActive={activeUserId === other?._id}
                  onClick={() => handleOpenConv(other?._id)}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Chat panel */}
      <div className={`flex-1 flex flex-col
        ${!activeUserId ? "hidden lg:flex items-center justify-center" : "flex"}`}>
        {activeUserId ? (
          <ChatWindow
            key={activeUserId}
            otherUserId={activeUserId}
            onBack={() => setActiveUserId(null)}
          />
        ) : (
          <div className="flex flex-col items-center gap-4 opacity-40">
            <MessageCircle size={48} className="text-gray-600" />
            <p className="text-gray-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Select a conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
