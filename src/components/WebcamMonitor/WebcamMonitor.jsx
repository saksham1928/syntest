import { forwardRef } from "react";
import Webcam from "react-webcam";
import { FACE_DETECTION_CONFIG } from "../../utils/faceDetectionConfig";

const WebcamMonitor = forwardRef(({ isFocused, debugInfo, showPreview = true }, ref) => {
  if (!showPreview) {
    return (
      <Webcam
        ref={ref}
        audio={false}
        width={FACE_DETECTION_CONFIG.WEBCAM_WIDTH}
        height={FACE_DETECTION_CONFIG.WEBCAM_HEIGHT}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: FACE_DETECTION_CONFIG.WEBCAM_WIDTH,
          height: FACE_DETECTION_CONFIG.WEBCAM_HEIGHT,
          facingMode: "user",
        }}
        style={{ display: "none" }}
      />
    );
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ color: 'black' }}>Webcam Monitor</h3>
      <Webcam
        ref={ref}
        audio={false}
        width={FACE_DETECTION_CONFIG.PREVIEW_WIDTH}
        height={FACE_DETECTION_CONFIG.PREVIEW_HEIGHT}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: FACE_DETECTION_CONFIG.WEBCAM_WIDTH,
          height: FACE_DETECTION_CONFIG.WEBCAM_HEIGHT,
          facingMode: "user",
        }}
        style={{
          border: isFocused ? "3px solid #28a745" : "3px solid #dc3545",
          borderRadius: "8px",
        }}
      />

      {/* Status Display */}
      <div
        style={{
          marginTop: "10px",
          padding: "15px",
          backgroundColor: isFocused ? "#097923" : "#7d0812",
          border: `2px solid ${isFocused ? "#28a745" : "#dc3545"}`,
          borderRadius: "8px",
        }}
      >
        <strong>Status:</strong> {isFocused ? "Focused" : "Not Focused"}
        <br />
        <small style={{ fontFamily: "monospace" }}>{debugInfo}</small>
      </div>
    </div>
  );
});

WebcamMonitor.displayName = "WebcamMonitor";

export default WebcamMonitor;