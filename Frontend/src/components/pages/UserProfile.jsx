import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import PostCard from "../PostCard";
import { Loader2, Calendar, ArrowLeft } from "lucide-react";

function UserProfile() {
  const { id } = useParams();
  const { user: loggedInUser, token } = useUser();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    // Redirect to own profile page if viewing yourself
    if (id === loggedInUser?._id) {
      navigate("/profile", { replace: true });
      return;
    }
    fetchProfile();
    fetchUserPosts();
  }, [id]);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 404) { setNotFound(true); return; }
      const data = await res.json();
      setProfile(data.user);
    } catch {
      setNotFound(true);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchUserPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      const userPosts = (data.posts || []).filter(
        (p) => String(p.user?._id || p.user) === String(id)
      );
      setPosts(userPosts);
    } catch {
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  const joinedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-400 text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>User not found</p>
        <button onClick={() => navigate(-1)} className="text-violet-400 text-sm hover:text-violet-300 transition-colors">
          ← Go back
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-[#0f0f13]/80 border-b border-white/[0.06] px-5 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/[0.05]"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {loadingProfile ? "Loading..." : profile?.name}
          </h1>
          <p className="text-gray-500 text-xs">{posts.length} posts</p>
        </div>
      </div>

      {/* Banner */}
      <div className="h-36 bg-gradient-to-br from-fuchsia-900/50 via-violet-900/30 to-[#0f0f13] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(139,92,246,0.3) 1px, transparent 1px),
                              linear-gradient(-45deg, rgba(217,70,239,0.3) 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        />
      </div>

      {/* Avatar row — no edit button for other users */}
      <div className="px-5 -mt-10 mb-4 relative z-10">
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

      {/* User info */}
      <div className="px-5 mb-5">
        {loadingProfile ? (
          <div className="flex flex-col gap-2">
            <div className="h-5 w-36 bg-white/[0.05] rounded-lg animate-pulse" />
            <div className="h-3 w-28 bg-white/[0.05] rounded-lg animate-pulse" />
          </div>
        ) : (
          <>
            <h2 className="text-white text-xl font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
              {profile?.name}
            </h2>

            <div className="flex flex-wrap items-center gap-4 mt-3">
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
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {posts.length}
                </span>
                <span className="text-gray-500 text-sm ml-1.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Posts
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="border-b border-white/[0.06] mb-0">
        <div className="px-5 py-3">
          <span className="text-white text-sm font-semibold border-b-2 border-violet-500 pb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Posts
          </span>
        </div>
      </div>

      {/* Posts — note: no onDelete prop passed, so delete button won't show */}
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
        // No onDelete prop = isOwner check will be false for all posts = no delete menu shown
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      )}
    </div>
  );
}

export default UserProfile;
