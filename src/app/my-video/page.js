// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Video, Clock, Monitor, PlusCircle } from "lucide-react";
// import { Vortex } from "@/components/ui/vortex";

// export default function MyVideos() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const res = await fetch("/api/user/my-video");
//         const data = await res.json();
//         if (data.success) {
//           setVideos(data.videos);
//         }
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   if (loading)
//     return <p className="text-center text-white text-2xl">Loading videos...</p>;

//   return (
//     <div className="relative min-h-screen flex flex-col items-center bg-transparent bg-opacity-90 p-10">
      
//       {/* Vortex Background */}
//       <div className="absolute inset-0 flex items-center justify-center -z-10">
//         <Vortex />
//       </div>

//       {/* Page Title - Placed at the Top */}
//       <h2 className="text-white text-4xl font-bold text-center mt-10 mb-8 relative z-10">
//         🎥 My Video Files
//       </h2>

//       {videos.length === 0 ? (
//         <div className="text-center text-gray-400 relative z-10">
//           <p className="text-2xl mb-4">No Video to Display</p>
//           <motion.button
//             onClick={() => router.push("/upload")}
//             className="px-6 py-3 bg-blue-800 rounded-lg hover:bg-blue-600 transition-all text-lg font-semibold flex items-center gap-2"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <PlusCircle size={20} />
//             Generate One
//           </motion.button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full relative z-10">
//           {videos.map((video) => (
//             <motion.div
//               key={video._id}
//               className="relative bg-gray-900 bg-opacity-80 p-6 rounded-xl shadow-lg flex items-center justify-between overflow-hidden"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               whileHover={{ scale: 1.02 }}
//             >
//               {/* Left Side - Details */}
//               <div className="text-white space-y-2 w-2/3">
//                 <h3 className="text-xl font-semibold flex items-center gap-2">
//                   <Video size={20} />
//                   {video.prompt}
//                 </h3>
//                 <p className="text-gray-400 flex items-center gap-2">
//                   <Monitor size={18} />
//                   <span>Resolution: {video.resolution}</span>
//                 </p>
//                 <p className="text-gray-400 flex items-center gap-2">
//                   <Clock size={18} />
//                   <span>{video.duration} sec</span>
//                 </p>
//               </div>

//               {/* Right Side - Video Player */}
//               <div className="w-1/3 flex justify-end">
//                 <video controls className="w-32 rounded-md">
//                   <source src={video.videoUrl} type="video/mp4" />
//                 </video>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Video, Clock, Monitor, PlusCircle, ArrowLeft, Film } from "lucide-react";

export default function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/user/my-video");
        const data = await res.json();
        if (data.success) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="neumorph-loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Main content container */}
      <div className="neumorph-container max-w-6xl mx-auto p-6 relative z-10">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => router.back()}
            className="neumorph-icon-button p-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-gray-400" />
          </motion.button>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            My Video Files
          </h2>
          <motion.button
            onClick={() => router.push("/upload")}
            className="neumorph-icon-button-accent p-3 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle size={20} className="text-blue-400" />
          </motion.button>
        </div>

        {videos.length === 0 ? (
          <div className="neumorph-card p-10 text-center">
            <div className="mb-6">
              <div className="neumorph-icon-large mx-auto mb-6">
                <Film size={40} className="text-gray-400" />
              </div>
              <p className="text-2xl mb-6 text-gray-300">No Video Files Found</p>
              <p className="text-gray-400 mb-10">Create your first video with AI</p>
            </div>
            <motion.button
              onClick={() => router.push("/upload")}
              className="neumorph-button-primary px-6 py-3 flex items-center gap-2 justify-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle size={20} />
              <span>Create New Video</span>
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                className="neumorph-card p-4 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className="relative rounded-lg overflow-hidden mb-4 aspect-video bg-gray-800"
                  onClick={() => router.push(`/video/${video.id}`)}
                >
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover cursor-pointer" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video size={40} className="text-gray-600" />
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 px-2 py-1 rounded text-xs flex items-center">
                    <Clock size={12} className="mr-1" />
                    {video.duration || "00:00"}
                  </div>
                </div>
                
                <div className="px-2">
                  <h3 className="text-lg font-semibold text-gray-100 truncate">{video.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 truncate">{video.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => router.push(`/video/edit/${video.id}`)}
                        className="neumorph-icon-button-small p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Monitor size={14} className="text-blue-400" />
                      </motion.button>
                      <motion.button
                        onClick={() => router.push(`/video/${video.id}`)}
                        className="neumorph-icon-button-small p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Video size={14} className="text-teal-400" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {videos.length > 0 && (
          <div className="mt-8 flex justify-center">
            <motion.button
              onClick={() => router.push("/upload")}
              className="neumorph-button-secondary px-6 py-3 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle size={20} />
              <span>Create New Video</span>
            </motion.button>
          </div>
        )}
      </div>
      
      {/* Neuromorphic styles */}
      <style jsx global>{`
        .neumorph-container {
          background-color: #151515;
          border-radius: 20px;
          box-shadow: 20px 20px 60px #0d0d0d, -20px -20px 60px #1d1d1d;
        }
        
        .neumorph-card {
          background-color: #191919;
          border-radius: 16px;
          box-shadow: 8px 8px 16px #0f0f0f, -8px -8px 16px #232323;
        }
        
        .neumorph-icon-button {
          background-color: #191919;
          border-radius: 12px;
          box-shadow: 5px 5px 10px #101010, -5px -5px 10px #222222;
          transition: all 0.3s ease;
        }
        
        .neumorph-icon-button:active {
          box-shadow: inset 5px 5px 10px #101010, inset -5px -5px 10px #222222;
        }
        
        .neumorph-icon-button-accent {
          background-color: #191919;
          border-radius: 12px;
          box-shadow: 5px 5px 10px #101010, -5px -5px 10px #222222;
          transition: all 0.3s ease;
        }
        
        .neumorph-icon-button-accent:active {
          box-shadow: inset 5px 5px 10px #101010, inset -5px -5px 10px #222222;
        }
        
        .neumorph-icon-button-small {
          background-color: #191919;
          border-radius: 8px;
          box-shadow: 3px 3px 6px #0f0f0f, -3px -3px 6px #232323;
          transition: all 0.3s ease;
        }
        
        .neumorph-icon-button-small:active {
          box-shadow: inset 3px 3px 6px #0f0f0f, inset -3px -3px 6px #232323;
        }
        
        .neumorph-icon-large {
          width: 80px;
          height: 80px;
          background-color: #191919;
          border-radius: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 8px 8px 16px #0f0f0f, -8px -8px 16px #232323;
        }
        
        .neumorph-button-primary {
          background: linear-gradient(145deg, #1a1a1a, #161616);
          border-radius: 10px;
          box-shadow: 5px 5px 10px #0d0d0d, -5px -5px 10px #252525;
          color: #fff;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }
        
        .neumorph-button-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #2be2cb, #4169e1);
          opacity: 0.1;
          transition: opacity 0.3s ease;
        }
        
        .neumorph-button-primary:hover::before {
          opacity: 0.2;
        }
        
        .neumorph-button-secondary {
          background: linear-gradient(145deg, #1a1a1a, #161616);
          border-radius: 10px;
          box-shadow: 5px 5px 10px #0d0d0d, -5px -5px 10px #252525;
          color: #fff;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }
        
        .neumorph-button-secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #2be2cb, #4169e1);
          opacity: 0.05;
          transition: opacity 0.3s ease;
        }
        
        .neumorph-button-secondary:hover::before {
          opacity: 0.1;
        }
        
        .neumorph-loader {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 5px solid #151515;
          border-top-color: #2be2cb;
          animation: spin 1s linear infinite;
          box-shadow: 0 0 15px rgba(43, 226, 203, 0.5);
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #222 1px, transparent 1px),
            linear-gradient(to bottom, #222 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}