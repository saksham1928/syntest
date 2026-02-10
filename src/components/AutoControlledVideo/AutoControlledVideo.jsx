import YouTube from "react-youtube";
import { useRef, useState, useEffect } from "react";
import { useFaceMeshDetection } from "../../hooks/useFaceMeshDetection";
import WebcamMonitor from "../WebcamMonitor/WebcamMonitor";

function AutoControlledVideo() {
  const playerRef = useRef(null);
  const webcamRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Handle focus loss
  const handleFocusLost = () => {
    if (playerRef.current && isVideoPlaying) {
      playerRef.current.pauseVideo();
      setIsVideoPlaying(false);
      console.log("Focus lost - video paused");
    }
  };

  // Handle focus regained
  const handleFocusRegained = () => {
    if (playerRef.current && !isVideoPlaying) {
      playerRef.current.playVideo();
      setIsVideoPlaying(true);
      console.log("Focus regained - video resumed");
    }
  };

  // Use the enhanced face mesh detection hook
  const { isInitialized, isFocused, error, debugInfo } = useFaceMeshDetection(
    webcamRef,
    {
      onFocusLost: handleFocusLost,
      onFocusRegained: handleFocusRegained,
    }
  );

  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.playVideo();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ color: 'black' }}>Focus-Aware Learning Platform</h2>

      {/* Show error if initialization failed */}
      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#760c15",
            border: "2px solid #dc3545",
            borderRadius: "8px",
            marginBottom: "20px",
            color: "#fcfcfc",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Show loading state */}
      {!isInitialized && !error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#09768a",
            border: "2px solid #0c5460",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
           Initializing advanced face detection model (this may take a few seconds)...
        </div>
      )}

      {/* Video Player */}
      <div style={{ marginBottom: "20px" }}>
        <YouTube
          videoId="dQw4w9WgXcQ"
          onReady={onReady}
          opts={{
            height: "360",
            width: "640",
            playerVars: {
              autoplay: 1,
              controls: 0,
              disablekb: 1,
              modestbranding: 1,
              rel: 0,
            },
          }}
        />

        {/* Video status indicator */}
        <div style={{ marginTop: "10px", fontSize: "14px" }}>
          <strong>Video Status:</strong>{" "}
          <span
            style={{
              color: isVideoPlaying ? "#28a745" : "#dc3545",
              fontWeight: "bold",
            }}
          >
            {isVideoPlaying ? "Playing" : "Paused"}
          </span>
        </div>
      </div>

      {/* Webcam Monitor */}
      <WebcamMonitor
        ref={webcamRef}
        isFocused={isFocused}
        debugInfo={debugInfo}
        showPreview={true}
      />

      {/* Manual Controls (for testing) */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            playerRef.current?.playVideo();
            setIsVideoPlaying(true);
          }}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
           Play
        </button>
        <button
          onClick={() => {
            playerRef.current?.pauseVideo();
            setIsVideoPlaying(false);
          }}
          style={{
            padding: "10px 20px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
           Pause
        </button>
      </div>

      {/* Info Box */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#0252a1",
          border: "2px solid #2196F3",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <strong>Advanced Focus Detection:</strong>
        <ul style={{ marginTop: "10px", marginBottom: 0 }}>
          <li> Detects if your eyes are open</li>
          <li> Tracks head direction (looking left/right)</li>
          <li>Monitors head angle (looking up/down)</li>
          <li>Checks head tilt</li>
          <li>Video pauses if any focus is lost for 1.5 seconds</li>
        </ul>
      </div>
    </div>
  );
}

export default AutoControlledVideo;