
// import { Image } from "lucide-react";
// import react, { useState } from "react";


// function ImageUploader({onImageUpload}){

//     const fileInputRef = react.useRef(null);
//     const [uploading, setUploading] = useState(false);
//     const handleFileChange=async(e)=>{
//         const file = e.target.files[0];
//         if(!file) return;

//         setUploading(true);
//         const formData=new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset","post_unsigned");
//         formData.append("folder","posts")

//         try{
//             const res=await fetch("https://api.cloudinary.com/v1_1/dlew9q2dv/image/upload",
//                 {
//                     method:"POST",
//                     body:formData
//                 })

//                 const data=await res.json();
//                 onImageUpload(data.secure_url);

//         }catch(error){
//             console.error("Error uploading image:", error);
//             alert("Failed to upload image. Please try again.");

//         }finally{
//             setUploading(false);
//         }
//     }
//     return(
//         <div className='relative'>
//           <button onClick={()=>fileInputRef.current.click()} type='button'>
//             <Image size={20}/>
//           </button>
//           <input type='file' accept="image/*"
//           className='hidden'
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           />
//           {uploading && (
//             <div className='flex items-center justify-center text-white'>
//               <p>Uploading...</p>
//             </div>
//           )}
//         </div>
//     )
// }

// export default ImageUploader;


import { ImagePlus, Loader2 } from "lucide-react";
import React, { useState, useRef } from "react";

function ImageUploader({ onImageUpload }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "post_unsigned");
    formData.append("folder", "posts");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dlew9q2dv/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onImageUpload(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => fileInputRef.current.click()}
        type="button"
        disabled={uploading}
        className="text-purple-400 hover:text-white transition-colors duration-200 disabled:opacity-50"
        title="Upload image"
      >
        {uploading ? <Loader2 size={18} className="animate-spin text-violet-400" /> : <ImagePlus size={20} />}
      </button>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ImageUploader;
