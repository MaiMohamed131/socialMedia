// import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
// import { io } from "socket.io-client";

// const UserContext = createContext(null);

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [socket, setSocket] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const socketRef = useRef(null);

//   // Hydrate from localStorage on mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");
//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   // Connect socket when token is available
//   useEffect(() => {
//     if (!token) {
//       // Disconnect if logged out
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current = null;
//         setSocket(null);
//       }
//       return;
//     }

//     // Connect with JWT auth
//     const newSocket = io("http://localhost:5000", {
//       auth: { token },
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 2000,
//     });

//     newSocket.on("connect", () => {
//       console.log("Socket connected:", newSocket.id);
//     });

//     newSocket.on("connect_error", (err) => {
//       console.error("Socket connection error:", err.message);
//     });

//     socketRef.current = newSocket;
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [token]);

//   const login = (userData, userToken) => {
//     setUser(userData);
//     setToken(userToken);
//     localStorage.setItem("token", userToken);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = useCallback(() => {
//     setUser(null);
//     setToken(null);
//     setUnreadCount(0);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//       socketRef.current = null;
//       setSocket(null);
//     }
//   }, []);

//   const updateUser = (updatedUser) => {
//     setUser(updatedUser);
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//   };

//   // Central authenticated fetch — auto-logout on 401
//   const authFetch = useCallback(async (url, options = {}) => {
//     const currentToken = localStorage.getItem("token");
//     const res = await fetch(url, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...(options.headers || {}),
//         Authorization: `Bearer ${currentToken}`,
//       },
//     });

//     if (res.status === 401) {
//       logout();
//       window.location.href = "/login";
//       throw new Error("Session expired. Please log in again.");
//     }

//     return res;
//   }, [logout]);

//   return (
//     <UserContext.Provider value={{
//       user, token, loading,
//       socket,
//       unreadCount, setUnreadCount,
//       login, logout, updateUser, authFetch
//     }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }


import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";

const UserContext = createContext(null);

// Generate a soft notification "ding" using Web Audio API — no file needed
const playNotificationSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // First tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.value = 880;
    osc1.type = "sine";
    gain1.gain.setValueAtTime(0, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.4);

    // Second tone (higher, slight delay — "ding dong" feel)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.value = 1100;
    osc2.type = "sine";
    gain2.gain.setValueAtTime(0, ctx.currentTime + 0.15);
    gain2.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.17);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc2.start(ctx.currentTime + 0.15);
    osc2.stop(ctx.currentTime + 0.55);
  } catch (e) {
    // Audio not supported — fail silently
  }
};

// Short soft "pop" — for liking a post
const playLikeSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.18);
  } catch {}
};

// Soft "whoosh" tap — for posting a comment
const playCommentSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.06);
    osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch {}
};

// Lighter, higher version — for replying
const playReplySound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(620, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(820, ctx.currentTime + 0.05);
    osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch {}
};


// Soft chime — for incoming message
const playMessageSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.12].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = i === 0 ? 740 : 920;
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.35);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.35);
    });
  } catch {}
};


export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const socketRef = useRef(null);
  const isFirstLoad = useRef(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fetch unread count from server whenever token becomes available
  // (covers page refresh + login)
  useEffect(() => {
  if (!token) return;

  const fetchUnread = async () => {
    try {
      const res = await fetch("http://localhost:5000/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;

      const data = await res.json();
      const count = data.unreadCount || 0;
      setUnreadCount(count);

      // Play sound on first load
      if (isFirstLoad.current && count > 0) {
        setTimeout(playNotificationSound, 800);
      }
      isFirstLoad.current = false;

      // Nested try for messages
      try {
        const mRes = await fetch("http://localhost:5000/messages/unread-count", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (mRes.ok) {
          const mData = await mRes.json();
          setUnreadMessages(mData.unreadCount || 0);
        }
      } catch (err) {
        console.error("Message fetch error:", err);
      }

    } catch (err) {
      console.error("Notification fetch error:", err);
    }
  };

  fetchUnread();
}, [token]);

  // Connect socket when token is available
  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
      }
      return;
    }

    const newSocket = io("http://localhost:5000", {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    // New message — increment badge + play sound
    newSocket.on("new_message", () => {
      setUnreadMessages((prev) => prev + 1);
      playMessageSound();
    });

    // Play sound + increment badge on every new real-time notification
    newSocket.on("new_notification", () => {
      setUnreadCount((prev) => prev + 1);
      playNotificationSound();
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  const login = (userData, userToken) => {
    isFirstLoad.current = true; // reset so sound plays after next login
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setUnreadCount(0);
    setUnreadMessages(0);
    isFirstLoad.current = true;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
    }
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const authFetch = useCallback(async (url, options = {}) => {
    const currentToken = localStorage.getItem("token");
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${currentToken}`,
      },
    });

    if (res.status === 401) {
      logout();
      window.location.href = "/login";
      throw new Error("Session expired. Please log in again.");
    }

    return res;
  }, [logout]);

  return (
    <UserContext.Provider value={{
      user, token, loading,
      socket,
      unreadCount, setUnreadCount,
      login, logout, updateUser, authFetch,
      playNotificationSound,
      playLikeSound,
      playCommentSound,
      playReplySound,
      playMessageSound,
      unreadMessages, setUnreadMessages,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
