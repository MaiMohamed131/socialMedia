// import { BarChart3, Calendar, Film, MapPin, Smile } from "lucide-react";
// import ImageUploader from "./ImageUploader";
// import react, { useState } from "react";


// function WhatsHappening(){

//     const[uploadedImage, setUploadedImage] = useState(null);
//     const [text, setText] = useState("");

//     const handlePost=async()=>{
//         if(!text|| !uploadedImage){
//             alert("Please enter some text or upload an image before posting.");
//         }
//         const newPost={
//             text,
//             image: uploadedImage,
//             createdAt: new Date()
//         }
//         try{
//             const token = localStorage.getItem("token");

//             const res= await fetch("http://localhost:5000/posts",
//             {
//                 method:"POST",
//                 headers:{"Content-Type":"application/json",
//                  "Authorization": `Bearer ${token}`},
//                 body:JSON.stringify(newPost)
//             })
//             const data= await res.json();
//            console.log("New Post:", newPost);
//            setText("");
//         setUploadedImage(null);
//         alert("Post created successfully!");
//         }
//         catch(error){
//             console.error("Error creating post:", error);
//         }  
//     }
//     return(
//        <div className="flex flex-col p-3 gap-3 border border-b-gray-200">

//         {/* Top Row */}
//         <div className="flex items-center gap-4">
//             <img className="w-12 h-12 rounded-full" src="/profile.jpg" alt="profile"/>
//             <input placeholder="What's happening?" 
//             value={text}
//             type="text"
//             onChange={(e)=>setText(e.target.value)}
//             className="bg-transparent border-none focus:outline-none"/>
//         </div>

//         {/* Icons Row */}
//         <div className='flex justify-between'>
//         <div className="flex gap-5 text-purple-500 ml-16">
//             <ImageUploader onImageUpload={setUploadedImage}/>
//             <Film size={20}/>
//             <BarChart3 size={20}/>
//             <Smile size={20}/>
//             <MapPin size={20}/>
//             <Calendar size={20}/>
//         </div>
//         <button onClick={handlePost} className='bg-purple-500 text-white font-semibold px-5 py-1 rounded-full hover:bg-purple-600 transition duration-200'>Post</button>
//         </div>
//         {/* Image Preview */}
//         {uploadedImage&&(

//             <div className='relative mt-4 w-[80%]'>
//                 <img className='w-full h-64 object-cover'
//                 src={uploadedImage}/> 
//             </div>

//         )}
//        </div>
//     )
// }

// export default WhatsHappening;


// import { BarChart3, Calendar, Film, MapPin, Smile, Loader2 } from "lucide-react";
// import ImageUploader from "./ImageUploader";
// import React, { useState } from "react";

// function WhatsHappening() {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const MAX_CHARS = 280;
//   const remaining = MAX_CHARS - text.length;
//   const isOverLimit = remaining < 0;
//   const isNearLimit = remaining <= 20 && remaining >= 0;

//   const handlePost = async () => {
//     if (!text && !uploadedImage) {
//       alert("Please enter some text or upload an image before posting.");
//       return;
//     }
//     if (isOverLimit) return;

//     setLoading(true);
//     const newPost = { text, image: uploadedImage, createdAt: new Date() };

//     try {
//       const token = localStorage.getItem("token");
//       await fetch("http://localhost:5000/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newPost),
//       });
//       setText("");
//       setUploadedImage(null);
//     } catch (error) {
//       console.error("Error creating post:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-5 border-b border-white/[0.06]">
//       {/* Top Row */}
//       <div className="flex gap-3">
//         <img
//           src="/profile.jpg"
//           alt="profile"
//           className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/30 flex-shrink-0"
//           onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
//         />
//         <div className="flex-1">
//           <textarea
//             placeholder="What's on your mind?"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             rows={3}
//             className="w-full bg-transparent border-none resize-none text-white text-[15px] placeholder-gray-600 outline-none leading-relaxed"
//             style={{ fontFamily: "'DM Sans', sans-serif" }}
//           />

//           {/* Image Preview */}
//           {uploadedImage && (
//             <div className="relative mt-3 rounded-xl overflow-hidden border border-white/[0.08]">
//               <img
//                 src={uploadedImage}
//                 alt="preview"
//                 className="w-full max-h-64 object-cover"
//               />
//               <button
//                 onClick={() => setUploadedImage(null)}
//                 className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white w-7 h-7 rounded-full flex items-center justify-center text-xs hover:bg-black/80 transition-colors duration-200"
//               >
//                 ✕
//               </button>
//             </div>
//           )}

//           <div className="h-px bg-white/[0.06] my-3" />

//           {/* Bottom Row */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4 text-gray-500">
//               <ImageUploader onImageUpload={setUploadedImage} />
//               <button className="text-purple-400 hover:text-white transition-colors duration-200">
//                 <Film size={20} />
//               </button>
//               <button className="text-purple-400 hover:text-white transition-colors duration-200">
//                 <BarChart3 size={20} />
//               </button>
//               <button className="text-purple-400 hover:text-white transition-colors duration-200">
//                 <Smile size={20} />
//               </button>
//               <button className="text-purple-400 hover:text-white transition-colors duration-200">
//                 <MapPin size={20} />
//               </button>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* Char counter */}
//               {text.length > 0 && (
//                 <span className={`text-xs font-medium ${isOverLimit ? "text-red-400" : isNearLimit ? "text-amber-400" : "text-gray-500"}`}>
//                   {remaining}
//                 </span>
//               )}

//               <button
//                 onClick={handlePost}
//                 disabled={loading || isOverLimit || (!text && !uploadedImage)}
//                 className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm px-5 py-2 rounded-full hover:opacity-90 active:scale-[0.97] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-violet-500/20"
//                 style={{ fontFamily: "'DM Sans', sans-serif" }}
//               >
//                 {loading ? <Loader2 size={14} className="animate-spin" /> : null}
//                 {loading ? "Posting..." : "Post"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WhatsHappening;


import { BarChart3, Film, MapPin, Smile, Loader2 } from "lucide-react";
import ImageUploader from "./ImageUploader";
import React, { useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

function WhatsHappening({ onNewPost }) {
  const { user, token, logout } = useUser();
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_CHARS = 280;
  const remaining = MAX_CHARS - text.length;
  const isOverLimit = remaining < 0;
  const isNearLimit = remaining <= 20 && remaining >= 0;

  const handlePost = async () => {
    if (!text && !uploadedImage) return;
    if (isOverLimit) return;
    if (!token) { navigate("/login"); return; }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, image: uploadedImage }),
      });

      if (res.status === 401) { logout(); navigate("/login"); return; }
      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to create post.");
        return;
      }

      const data = await res.json();
      // Attach full user so the card renders instantly without a refetch
      const newPost = {
        ...data.post,
        user: { _id: user._id, name: user.name, avatar: user.avatar },
        likes: [],
      };

      setText("");
      setUploadedImage(null);
      if (onNewPost) onNewPost(newPost);
    } catch (error) {
      alert("Network error. Is the server running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 border-b border-white/[0.06]">
      <div className="flex gap-3">
        <img
          src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/30 flex-shrink-0"
          onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"; }}
        />
        <div className="flex-1">
          <textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full bg-transparent border-none resize-none text-white text-[15px] placeholder-gray-600 outline-none leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />

          {uploadedImage && (
            <div className="relative mt-3 rounded-xl overflow-hidden border border-white/[0.08]">
              <img src={uploadedImage} alt="preview" className="w-full max-h-64 object-cover" />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white w-7 h-7 rounded-full flex items-center justify-center text-xs hover:bg-black/80 transition-colors"
              >✕</button>
            </div>
          )}

          <div className="h-px bg-white/[0.06] my-3" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-gray-500">
              <ImageUploader onImageUpload={setUploadedImage} />
              <button className="hover:text-violet-400 transition-colors"><Film size={18} /></button>
              <button className="hover:text-violet-400 transition-colors"><BarChart3 size={18} /></button>
              <button className="hover:text-violet-400 transition-colors"><Smile size={18} /></button>
              <button className="hover:text-violet-400 transition-colors"><MapPin size={18} /></button>
            </div>
            <div className="flex items-center gap-3">
              {text.length > 0 && (
                <span className={`text-xs font-medium ${isOverLimit ? "text-red-400" : isNearLimit ? "text-amber-400" : "text-gray-500"}`}>
                  {remaining}
                </span>
              )}
              <button
                onClick={handlePost}
                disabled={loading || isOverLimit || (!text && !uploadedImage)}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm px-5 py-2 rounded-full hover:opacity-90 active:scale-[0.97] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-violet-500/20"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsHappening;
