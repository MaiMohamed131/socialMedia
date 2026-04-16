import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import PostCard from "../PostCard";
import { Loader2, Calendar, Mail, Edit3 } from "lucide-react";

function Profile() {
  const { user, token } = useUser();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (!token) return;
    fetchProfile();
    fetchUserPosts();
  }, [token]);

  const fetchProfile = async () => {
    try {
      // Use the /me/profile endpoint — needs auth
      const res = await fetch(`http://localhost:5000/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProfile(data.user);
    } catch (e) {
      console.error("Failed to fetch profile", e);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      // Filter to only this user's posts
      const myPosts = (data.posts || []).filter(
        (p) => (p.user?._id || p.user) === user._id
      );
      setPosts(myPosts);
    } catch (e) {
      console.error("Failed to fetch posts", e);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleDelete = (postId) => setPosts((prev) => prev.filter((p) => p._id !== postId));

  const joinedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  return (
    <div>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-[#0f0f13]/80 border-b border-white/[0.06] px-5 py-4">
        <h1 className="text-white font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
          {user?.name || "Profile"}
        </h1>
        <p className="text-gray-500 text-xs mt-0.5">{posts.length} posts</p>
      </div>

      {/* Banner */}
      <div className="h-36 bg-gradient-to-br from-violet-900/60 via-fuchsia-900/40 to-[#0f0f13] relative">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(139,92,246,0.4) 1px, transparent 1px)`,
            backgroundSize: "28px 28px"
          }}
        />
      </div>

      {/* Avatar + Edit row */}
      <div className="px-5 flex items-end justify-between -mt-10 mb-4 relative z-10">
        <div className="relative">
          {loadingProfile ? (
            <div className="w-20 h-20 rounded-full bg-white/[0.05] border-4 border-[#0f0f13] animate-pulse" />
          ) : (
            <img
              src={profile?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
              alt={profile?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#0f0f13] ring-2 ring-violet-500/30"
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
            />
          )}
        </div>
        <button className="flex items-center gap-2 border border-white/[0.12] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/[0.05] transition-colors duration-200 mb-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Edit3 size={14} />
          Edit profile
        </button>
      </div>

      {/* User info */}
      <div className="px-5 mb-5">
        {loadingProfile ? (
          <div className="flex flex-col gap-2">
            <div className="h-5 w-32 bg-white/[0.05] rounded-lg animate-pulse" />
            <div className="h-3 w-24 bg-white/[0.05] rounded-lg animate-pulse" />
          </div>
        ) : (
          <>
            <h2 className="text-white text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
              {profile?.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Mail size={14} />
                <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{profile?.email}</span>
              </div>
              {joinedDate && (
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <Calendar size={14} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif" }}>Joined {joinedDate}</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <div>
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{posts.length}</span>
                <span className="text-gray-500 text-sm ml-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Posts</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-white/[0.06]">
        <div className="flex">
          {["posts", "likes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold capitalize transition-all duration-200 relative
                ${activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      {loadingPosts ? (
        <div className="flex justify-center py-16">
          <Loader2 size={22} className="animate-spin text-violet-500" />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            <span className="text-2xl">✦</span>
          </div>
          <p className="text-gray-500 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            No posts yet
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

export default Profile;
