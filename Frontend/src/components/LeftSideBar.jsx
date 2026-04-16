
// import { Bell, Bookmark, Home, Mail, Search, User } from "lucide-react";
// import react from "react";


// function LeftSideBar(){
//     const menu=[
//             {icon:<Home/>, label:'Home'},
//             {icon:<Search/>, label:'Explore'},
//             {icon:<Bell/>, label:'Notifications'},
//             {icon:<Mail/>, label:'Messages'},
//             {icon:<Bookmark/>, label:'Bookmarks'},
//             {icon:<User/>, label:'Profile'},
//         ]
    
    
//     return(

//         <div className='hidden md:flex flex-col w-64 p-4 border-r border-gray-200 h-screen sticky top-0'>
//           <img className='w-16 ml-10 mb-6' src='logo.png' alt='logo'/>

//           <nav className='flex flex-col gap-4'>
//             {menu.map((item,index)=>(
//                 <div className='flex items-center gap-4 text-lg p-2 hover:text-purple-500 cursor-pointer font-bold'>
//                 <button>{item.icon}</button>
//                 <span>{item.label}</span>
//                 </div>
//             ))}
//           </nav>
//           <button className='mt-4 font-bold text-lg p-2 text-purple-500 hover:text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-full'>
//             Post
//           </button>
//         </div>
//     )
// }

// export default LeftSideBar;

// import { Bell, Bookmark, Home, Mail, Search, User, Feather } from "lucide-react";
// import React from "react";

// function LeftSideBar() {
//   const menu = [
//     { icon: <Home size={22} />, label: "Home", active: true },
//     { icon: <Search size={22} />, label: "Explore" },
//     { icon: <Bell size={22} />, label: "Notifications" },
//     { icon: <Mail size={22} />, label: "Messages" },
//     { icon: <Bookmark size={22} />, label: "Bookmarks" },
//     { icon: <User size={22} />, label: "Profile" },
//   ];

//   return (
//     <div className="hidden md:flex flex-col w-72 p-6 h-screen sticky top-0 border-r border-white/[0.06]">
//       {/* Logo */}
//       <div className="mb-8 flex items-center gap-3 px-2">
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
//           <Feather size={18} className="text-white" />
//         </div>
//         <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
//           Pulse
//         </span>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-col gap-1 flex-1">
//         {menu.map((item, index) => (
//           <button
//             key={index}
//             className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 group w-full text-left
//               ${item.active
//                 ? "bg-violet-500/15 text-violet-400"
//                 : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
//               }`}
//           >
//             <span className={`transition-colors duration-200 ${item.active ? "text-violet-400" : "text-gray-500 group-hover:text-white"}`}>
//               {item.icon}
//             </span>
//             <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
//             {item.label === "Notifications" && (
//               <span className="ml-auto w-2 h-2 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50" />
//             )}
//           </button>
//         ))}
//       </nav>

//       {/* Post Button */}
//       <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/25"
//         style={{ fontFamily: "'DM Sans', sans-serif" }}>
//         New Post
//       </button>

//       {/* User avatar at bottom */}
//       <div className="mt-6 flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-all duration-200">
//         <img
//           src="/profile.jpg"
//           alt="profile"
//           className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/30"
//           onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png" }}
//         />
//         <div className="flex flex-col">
//           <span className="text-white text-sm font-semibold leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//             Your Name
//           </span>
//           <span className="text-gray-500 text-xs">@username</span>
//         </div>
//         <span className="ml-auto text-gray-600 text-lg">···</span>
//       </div>
//     </div>
//   );
// }

// export default LeftSideBar;

// import { Bell, Bookmark, Home, Mail, Search, User, Feather, LogOut } from "lucide-react";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LeftSideBar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const navigate = useNavigate();

//   // Read logged-in user from localStorage
//   const stored = localStorage.getItem("user");
//   const user = stored ? JSON.parse(stored) : null;

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const menu = [
//     { icon: <Home size={22} />, label: "Home", active: true },
//     { icon: <Search size={22} />, label: "Explore" },
//     { icon: <Bell size={22} />, label: "Notifications" },
//     { icon: <Mail size={22} />, label: "Messages" },
//     { icon: <Bookmark size={22} />, label: "Bookmarks" },
//     { icon: <User size={22} />, label: "Profile" },
//   ];

//   return (
//     <div className="hidden md:flex flex-col w-72 p-6 h-screen sticky top-0 border-r border-white/[0.06]">
//       {/* Logo */}
//       <div className="mb-8 flex items-center gap-3 px-2">
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
//           <Feather size={18} className="text-white" />
//         </div>
//         <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
//           Pulse
//         </span>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-col gap-1 flex-1">
//         {menu.map((item) => (
//           <button
//             key={item.label}
//             className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 group w-full text-left
//               ${item.active
//                 ? "bg-violet-500/15 text-violet-400"
//                 : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
//               }`}
//           >
//             <span className={`transition-colors duration-200 ${item.active ? "text-violet-400" : "text-gray-500 group-hover:text-white"}`}>
//               {item.icon}
//             </span>
//             <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
//             {item.label === "Notifications" && (
//               <span className="ml-auto w-2 h-2 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50" />
//             )}
//           </button>
//         ))}
//       </nav>

//       {/* Post Button */}
//       <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/25"
//         style={{ fontFamily: "'DM Sans', sans-serif" }}>
//         New Post
//       </button>

//       {/* User section with logout dropdown */}
//       <div className="relative mt-6">
//         <button
//           onClick={() => setShowMenu((prev) => !prev)}
//           className="w-full flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200"
//         >
//           <img
//             src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
//             alt="profile"
//             className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/30 flex-shrink-0"
//             onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//           />
//           <div className="flex flex-col text-left min-w-0">
//             <span className="text-white text-sm font-semibold leading-tight truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//               {user?.name || "Guest"}
//             </span>
//             <span className="text-gray-500 text-xs truncate">
//               {user?.email || ""}
//             </span>
//           </div>
//           <span className="ml-auto text-gray-600 text-base flex-shrink-0">···</span>
//         </button>

//         {/* Dropdown */}
//         {showMenu && (
//           <>
//             {/* Backdrop to close on outside click */}
//             <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
//             <div className="absolute bottom-full left-0 right-0 mb-2 z-20 bg-[#1a1a24] border border-white/[0.08] rounded-xl shadow-xl shadow-black/40 overflow-hidden">
//               <div className="px-4 py-3 border-b border-white/[0.06]">
//                 <p className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//                   {user?.name || "Guest"}
//                 </p>
//                 <p className="text-gray-500 text-xs mt-0.5">{user?.email || ""}</p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-200 text-sm font-medium"
//                 style={{ fontFamily: "'DM Sans', sans-serif" }}
//               >
//                 <LogOut size={16} />
//                 Log out
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LeftSideBar;


// import { Bell, Bookmark, Home, Mail, Search, User, Feather, LogOut } from "lucide-react";
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useUser } from "./UserContext";

// function LeftSideBar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useUser();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const menu = [
//     { icon: <Home size={22} />, label: "Home", path: "/" },
//     { icon: <Search size={22} />, label: "Explore", path: "/explore" },
//     { icon: <Bell size={22} />, label: "Notifications", path: "/notifications" },
//     { icon: <Mail size={22} />, label: "Messages", path: "/messages" },
//     { icon: <Bookmark size={22} />, label: "Bookmarks", path: "/bookmarks" },
//     { icon: <User size={22} />, label: "Profile", path: "/profile" },
//   ];

//   return (
//     <div className="hidden md:flex flex-col w-72 p-6 h-screen sticky top-0 border-r border-white/[0.06]">
//       {/* Logo */}
//       <div className="mb-8 flex items-center gap-3 px-2">
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
//           <Feather size={18} className="text-white" />
//         </div>
//         <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
//           Pulse
//         </span>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-col gap-1 flex-1">
//         {menu.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <button
//               key={item.label}
//               onClick={() => navigate(item.path)}
//               className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 group w-full text-left
//                 ${isActive
//                   ? "bg-violet-500/15 text-violet-400"
//                   : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
//                 }`}
//             >
//               <span className={`transition-colors duration-200 ${isActive ? "text-violet-400" : "text-gray-500 group-hover:text-white"}`}>
//                 {item.icon}
//               </span>
//               <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>
//               {item.label === "Notifications" && (
//                 <span className="ml-auto w-2 h-2 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50" />
//               )}
//             </button>
//           );
//         })}
//       </nav>

//       {/* Post Button */}
//       <button
//         onClick={() => navigate("/")}
//         className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/25"
//         style={{ fontFamily: "'DM Sans', sans-serif" }}>
//         New Post
//       </button>

//       {/* User section with logout dropdown */}
//       <div className="relative mt-6">
//         <button
//           onClick={() => setShowMenu((prev) => !prev)}
//           className="w-full flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200"
//         >
//           <img
//             src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
//             alt="profile"
//             className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/30 flex-shrink-0"
//             onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//           />
//           <div className="flex flex-col text-left min-w-0">
//             <span className="text-white text-sm font-semibold leading-tight truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//               {user?.name || "Guest"}
//             </span>
//             <span className="text-gray-500 text-xs truncate">{user?.email || ""}</span>
//           </div>
//           <span className="ml-auto text-gray-600 text-base flex-shrink-0">···</span>
//         </button>

//         {showMenu && (
//           <>
//             <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
//             <div className="absolute bottom-full left-0 right-0 mb-2 z-20 bg-[#1a1a24] border border-white/[0.08] rounded-xl shadow-xl shadow-black/40 overflow-hidden">
//               <div className="px-4 py-3 border-b border-white/[0.06]">
//                 <p className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//                   {user?.name || "Guest"}
//                 </p>
//                 <p className="text-gray-500 text-xs mt-0.5">{user?.email || ""}</p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-200 text-sm font-medium"
//                 style={{ fontFamily: "'DM Sans', sans-serif" }}
//               >
//                 <LogOut size={16} />
//                 Log out
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LeftSideBar;


// import { Bell, Bookmark, Home, Mail, Search, User, Feather, LogOut } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useUser } from "./UserContext";

// function LeftSideBar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout, unreadCount, setUnreadCount, socket } = useUser();

//   // Clear badge when visiting notifications
//   useEffect(() => {
//     if (location.pathname === "/notifications") {
//       setUnreadCount(0);
//     }
//   }, [location.pathname]);

//   // Increment badge in real-time on any page
//   useEffect(() => {
//     if (!socket) return;
//     const handle = () => setUnreadCount((p) => p + 1);
//     socket.on("new_notification", handle);
//     return () => socket.off("new_notification", handle);
//   }, [socket]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const menu = [
//     { icon: <Home size={22} />, label: "Home", path: "/" },
//     { icon: <Search size={22} />, label: "Explore", path: "/explore" },
//     {
//       icon: <Bell size={22} />, label: "Notifications", path: "/notifications",
//       badge: unreadCount,
//     },
//     { icon: <Mail size={22} />, label: "Messages", path: "/messages" },
//     { icon: <Bookmark size={22} />, label: "Bookmarks", path: "/bookmarks" },
//     { icon: <User size={22} />, label: "Profile", path: "/profile" },
//   ];

//   return (
//     <div className="hidden md:flex flex-col w-72 p-6 h-screen sticky top-0 border-r border-white/[0.06]">
//       {/* Logo */}
//       <div className="mb-8 flex items-center gap-3 px-2">
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
//           <Feather size={18} className="text-white" />
//         </div>
//         <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
//           Pulse
//         </span>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-col gap-1 flex-1">
//         {menu.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <button
//               key={item.label}
//               onClick={() => navigate(item.path)}
//               className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 group w-full text-left
//                 ${isActive
//                   ? "bg-violet-500/15 text-violet-400"
//                   : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
//                 }`}
//             >
//               <span className={`transition-colors duration-200 ${isActive ? "text-violet-400" : "text-gray-500 group-hover:text-white"}`}>
//                 {item.icon}
//               </span>
//               <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>

//               {/* Unread badge */}
//               {item.badge > 0 && (
//                 <span className="ml-auto bg-violet-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm shadow-violet-500/50">
//                   {item.badge > 99 ? "99+" : item.badge}
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </nav>

//       {/* Post Button */}
//       <button
//         onClick={() => navigate("/")}
//         className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/25"
//         style={{ fontFamily: "'DM Sans', sans-serif" }}>
//         New Post
//       </button>

//       {/* User section */}
//       <div className="relative mt-6">
//         <button
//           onClick={() => setShowMenu((prev) => !prev)}
//           className="w-full flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200"
//         >
//           <img
//             src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
//             alt="profile"
//             className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/30 flex-shrink-0"
//             onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//           />
//           <div className="flex flex-col text-left min-w-0">
//             <span className="text-white text-sm font-semibold leading-tight truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//               {user?.name || "Guest"}
//             </span>
//             <span className="text-gray-500 text-xs truncate">{user?.email || ""}</span>
//           </div>
//           <span className="ml-auto text-gray-600 text-base flex-shrink-0">···</span>
//         </button>

//         {showMenu && (
//           <>
//             <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
//             <div className="absolute bottom-full left-0 right-0 mb-2 z-20 bg-[#1a1a24] border border-white/[0.08] rounded-xl shadow-xl shadow-black/40 overflow-hidden">
//               <div className="px-4 py-3 border-b border-white/[0.06]">
//                 <p className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//                   {user?.name || "Guest"}
//                 </p>
//                 <p className="text-gray-500 text-xs mt-0.5">{user?.email || ""}</p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-200 text-sm font-medium"
//                 style={{ fontFamily: "'DM Sans', sans-serif" }}
//               >
//                 <LogOut size={16} />
//                 Log out
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LeftSideBar;


// import { Bell, Bookmark, Home, Mail, Search, User, Feather, LogOut } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useUser } from "./UserContext";

// // CSS keyframes injected once
// const STYLES = `
// @keyframes bell-ring {
//   0%   { transform: rotate(0deg); }
//   10%  { transform: rotate(18deg); }
//   20%  { transform: rotate(-16deg); }
//   30%  { transform: rotate(14deg); }
//   40%  { transform: rotate(-10deg); }
//   50%  { transform: rotate(6deg); }
//   60%  { transform: rotate(-4deg); }
//   70%  { transform: rotate(2deg); }
//   100% { transform: rotate(0deg); }
// }
// @keyframes badge-pop {
//   0%   { transform: scale(0.5); opacity: 0; }
//   60%  { transform: scale(1.3); }
//   100% { transform: scale(1);   opacity: 1; }
// }
// .bell-ring  { animation: bell-ring 0.6s ease forwards; }
// .badge-pop  { animation: badge-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
// `;

// function LeftSideBar() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [bellRing, setBellRing] = useState(false);
//   const [badgePop, setBadgePop] = useState(false);
//   const prevCount = useRef(0);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout, unreadCount, setUnreadCount, socket } = useUser();

//   // Inject keyframes once
//   useEffect(() => {
//     if (document.getElementById("sidebar-styles")) return;
//     const style = document.createElement("style");
//     style.id = "sidebar-styles";
//     style.textContent = STYLES;
//     document.head.appendChild(style);
//   }, []);

//   // Animate bell + badge whenever unreadCount increases
//   useEffect(() => {
//     if (unreadCount > prevCount.current) {
//       setBellRing(true);
//       setBadgePop(true);
//       const t1 = setTimeout(() => setBellRing(false), 650);
//       const t2 = setTimeout(() => setBadgePop(false), 400);
//       return () => { clearTimeout(t1); clearTimeout(t2); };
//     }
//     prevCount.current = unreadCount;
//   }, [unreadCount]);

//   // Clear badge when visiting notifications page
//   useEffect(() => {
//     if (location.pathname === "/notifications") {
//       setUnreadCount(0);
//     }
//   }, [location.pathname]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const menu = [
//     { icon: <Home size={22} />, label: "Home", path: "/" },
//     { icon: <Search size={22} />, label: "Explore", path: "/explore" },
//     { icon: null, label: "Notifications", path: "/notifications", badge: unreadCount, isBell: true },
//     { icon: <Mail size={22} />, label: "Messages", path: "/messages" },
//     { icon: <Bookmark size={22} />, label: "Bookmarks", path: "/bookmarks" },
//     { icon: <User size={22} />, label: "Profile", path: "/profile" },
//   ];

//   return (
//     <div className="hidden md:flex flex-col w-72 p-6 h-screen sticky top-0 border-r border-white/[0.06]">
//       {/* Logo */}
//       <div className="mb-8 flex items-center gap-3 px-2">
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
//           <Feather size={18} className="text-white" />
//         </div>
//         <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
//           Pulse
//         </span>
//       </div>

//       {/* Nav */}
//       <nav className="flex flex-col gap-1 flex-1">
//         {menu.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <button
//               key={item.label}
//               onClick={() => navigate(item.path)}
//               className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 group w-full text-left
//                 ${isActive
//                   ? "bg-violet-500/15 text-violet-400"
//                   : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
//                 }`}
//             >
//               {/* Icon — bell gets ring animation */}
//               <span className={`transition-colors duration-200 flex-shrink-0
//                 ${isActive ? "text-violet-400" : "text-gray-500 group-hover:text-white"}
//                 ${item.isBell && bellRing ? "bell-ring" : ""}`}
//               >
//                 {item.isBell ? <Bell size={22} /> : item.icon}
//               </span>

//               <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>

//               {/* Badge */}
//               {item.badge > 0 && (
//                 <span
//                   className={`ml-auto text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
//                     bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-sm shadow-violet-500/50
//                     ${badgePop ? "badge-pop" : ""}`}
//                 >
//                   {item.badge > 99 ? "99+" : item.badge}
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </nav>

//       {/* Post Button */}
//       <button
//         onClick={() => navigate("/")}
//         className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/25"
//         style={{ fontFamily: "'DM Sans', sans-serif" }}>
//         New Post
//       </button>

//       {/* User section */}
//       <div className="relative mt-6">
//         <button
//           onClick={() => setShowMenu((prev) => !prev)}
//           className="w-full flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200"
//         >
//           <img
//             src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
//             alt="profile"
//             className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/30 flex-shrink-0"
//             onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//           />
//           <div className="flex flex-col text-left min-w-0">
//             <span className="text-white text-sm font-semibold leading-tight truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//               {user?.name || "Guest"}
//             </span>
//             <span className="text-gray-500 text-xs truncate">{user?.email || ""}</span>
//           </div>
//           <span className="ml-auto text-gray-600 text-base flex-shrink-0">···</span>
//         </button>

//         {showMenu && (
//           <>
//             <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
//             <div className="absolute bottom-full left-0 right-0 mb-2 z-20 bg-[#1a1a24] border border-white/[0.08] rounded-xl shadow-xl shadow-black/40 overflow-hidden">
//               <div className="px-4 py-3 border-b border-white/[0.06]">
//                 <p className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//                   {user?.name || "Guest"}
//                 </p>
//                 <p className="text-gray-500 text-xs mt-0.5">{user?.email || ""}</p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-200 text-sm font-medium"
//                 style={{ fontFamily: "'DM Sans', sans-serif" }}
//               >
//                 <LogOut size={16} />
//                 Log out
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LeftSideBar;


import { Bell, Bookmark, Home, Mail, Search, User, Feather, LogOut } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";

// CSS keyframes injected once
const STYLES = `
@keyframes bell-ring {
  0%   { transform: rotate(0deg); }
  10%  { transform: rotate(18deg); }
  20%  { transform: rotate(-16deg); }
  30%  { transform: rotate(14deg); }
  40%  { transform: rotate(-10deg); }
  50%  { transform: rotate(6deg); }
  60%  { transform: rotate(-4deg); }
  70%  { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
}
@keyframes badge-pop {
  0%   { transform: scale(0.5); opacity: 0; }
  60%  { transform: scale(1.3); }
  100% { transform: scale(1);   opacity: 1; }
}
.bell-ring  { animation: bell-ring 0.6s ease forwards; }
.badge-pop  { animation: badge-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
`;

function LeftSideBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [bellRing, setBellRing] = useState(false);
  const [badgePop, setBadgePop] = useState(false);
  const [msgPop, setMsgPop] = useState(false);
  const prevMsgCount = useRef(0);
  const prevCount = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, unreadCount, setUnreadCount, socket, unreadMessages, setUnreadMessages } = useUser();

  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById("sidebar-styles")) return;
    const style = document.createElement("style");
    style.id = "sidebar-styles";
    style.textContent = STYLES;
    document.head.appendChild(style);
  }, []);

  // Animate bell + badge whenever unreadCount increases
  useEffect(() => {
    if (unreadCount > prevCount.current) {
      setBellRing(true);
      setBadgePop(true);
      const t1 = setTimeout(() => setBellRing(false), 650);
      const t2 = setTimeout(() => setBadgePop(false), 400);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    prevCount.current = unreadCount;
  }, [unreadCount]);

  // Animate message badge on new messages
  useEffect(() => {
    if (unreadMessages > prevMsgCount.current) {
      setMsgPop(true);
      const t = setTimeout(() => setMsgPop(false), 400);
      return () => clearTimeout(t);
    }
    prevMsgCount.current = unreadMessages;
  }, [unreadMessages]);

  // Clear message badge when on messages page
  useEffect(() => {
    if (location.pathname === "/messages") {
      setUnreadMessages(0);
    }
  }, [location.pathname]);

  // Clear badge when visiting notifications page
  useEffect(() => {
    if (location.pathname === "/notifications") {
      setUnreadCount(0);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = [
    { icon: <Home size={22} />, label: "Home", path: "/" },
    { icon: <Search size={22} />, label: "Explore", path: "/explore" },
    { icon: null, label: "Notifications", path: "/notifications", badge: unreadCount, isBell: true },
    { icon: <Mail size={22} />, label: "Messages", path: "/messages", badge: unreadMessages, isMail: true },
    { icon: <Bookmark size={22} />, label: "Bookmarks", path: "/bookmarks" },
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="hidden md:flex flex-col w-72 p-6 h-screen sticky top-0 border-r border-white/[0.06]">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <Feather size={18} className="text-white" />
        </div>
        <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
          Pulse
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 group w-full text-left
                ${isActive
                  ? "bg-violet-500/15 text-violet-400"
                  : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                }`}
            >
              {/* Icon — bell gets ring animation */}
              <span className={`transition-colors duration-200 flex-shrink-0
                ${isActive ? "text-violet-400" : "text-gray-500 group-hover:text-white"}
                ${item.isBell && bellRing ? "bell-ring" : ""}`}
              >
                {item.isBell ? <Bell size={22} /> : item.icon}
              </span>

              <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</span>

              {/* Badge */}
              {item.badge > 0 && (
                <span
                  className={`ml-auto text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
                    bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-sm shadow-violet-500/50
                    ${item.isBell && badgePop ? "badge-pop" : ""}
                    ${item.isMail && msgPop ? "badge-pop" : ""}`}
                >
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Post Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-[15px] hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-500/25"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>
        New Post
      </button>

      {/* User section */}
      <div className="relative mt-6">
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="w-full flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200"
        >
          <img
            src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
            alt="profile"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/30 flex-shrink-0"
            onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
          />
          <div className="flex flex-col text-left min-w-0">
            <span className="text-white text-sm font-semibold leading-tight truncate" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {user?.name || "Guest"}
            </span>
            <span className="text-gray-500 text-xs truncate">{user?.email || ""}</span>
          </div>
          <span className="ml-auto text-gray-600 text-base flex-shrink-0">···</span>
        </button>

        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute bottom-full left-0 right-0 mb-2 z-20 bg-[#1a1a24] border border-white/[0.08] rounded-xl shadow-xl shadow-black/40 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {user?.name || "Guest"}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{user?.email || ""}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors duration-200 text-sm font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <LogOut size={16} />
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LeftSideBar;


