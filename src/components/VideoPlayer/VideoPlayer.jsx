import React, { useRef, useState } from 'react';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-8 bg-black rounded-xl overflow-hidden shadow-2xl">
      {/* 1. The Video Tag */}
      <video
        ref={videoRef}
        className="w-full h-auto object-cover"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
        controls={true} // We will build custom controls later
        onClick={togglePlay}
      />

      {/* 2. Custom Overlay (For AI Alerts later) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full">
            <span className="text-white text-4xl">▶</span>
          </div>
        </div>
      )}
      
      {/* 3. Simple Controls (Optional for now) */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between">
        <button 
          onClick={togglePlay}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;