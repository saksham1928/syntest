import { useRef, useEffect, useState, useCallback } from "react";
import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import { FACE_DETECTION_CONFIG } from "../utils/faceDetectionConfig";

export function useFaceDetection(webcamRef, options = {}) {
  const {
    onFocusLost,
    onFocusRegained,
    focusLossThreshold = FACE_DETECTION_CONFIG.FOCUS_LOSS_THRESHOLD,
  } = options;

  const faceDetectorRef = useRef(null);
  const animationRef = useRef(null);
  const lastDetectionTimeRef = useRef(Date.now());
  const wasFocusedRef = useRef(true);

  const [isInitialized, setIsInitialized] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");

  // Initialize MediaPipe Face Detector
  useEffect(() => {
    let isMounted = true;

    const initializeFaceDetector = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          FACE_DETECTION_CONFIG.WASM_PATH
        );

        const detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: FACE_DETECTION_CONFIG.MODEL_PATH,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          minDetectionConfidence: FACE_DETECTION_CONFIG.MIN_DETECTION_CONFIDENCE,
        });

        if (isMounted) {
          faceDetectorRef.current = detector;
          setIsInitialized(true);
          console.log("Face detector initialized");
        }
      } catch (err) {
        console.error("Error initializing face detector:", err);
        if (isMounted) {
          setError(err.message);
        }
      }
    };

    initializeFaceDetector();

    return () => {
      isMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (faceDetectorRef.current) {
        faceDetectorRef.current.close();
      }
    };
  }, []);

  // Detection loop
  const detectFace = useCallback(async () => {
    if (
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4 ||
      !faceDetectorRef.current
    ) {
      animationRef.current = requestAnimationFrame(detectFace);
      return;
    }

    const video = webcamRef.current.video;
    const nowInMs = Date.now();

    try {
      // Perform face detection
      const detections = faceDetectorRef.current.detectForVideo(video, nowInMs);
      const facesFound = detections.detections.length > 0;

      setFaceDetected(facesFound);

      if (facesFound) {
        // Face detected - update last detection time
        lastDetectionTimeRef.current = nowInMs;

        // Check if focus was just regained
        if (!wasFocusedRef.current) {
          wasFocusedRef.current = true;
          onFocusRegained?.();
        }

        setDebugInfo(` Face detected (${detections.detections.length} face(s))`);
      } else {
        // No face detected
        const timeSinceLastDetection = nowInMs - lastDetectionTimeRef.current;

        setDebugInfo(` No face (${Math.round(timeSinceLastDetection)}ms)`);

        // Check if focus was just lost
        if (
          timeSinceLastDetection > focusLossThreshold &&
          wasFocusedRef.current
        ) {
          wasFocusedRef.current = false;
          onFocusLost?.();
        }
      }
    } catch (err) {
      console.error("Detection error:", err);
      setDebugInfo(`Error: ${err.message}`);
    }

    // Continue detection loop
    animationRef.current = requestAnimationFrame(detectFace);
  }, [webcamRef, onFocusLost, onFocusRegained, focusLossThreshold]);

  // Start detection when initialized
  useEffect(() => {
    if (isInitialized) {
      detectFace();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInitialized, detectFace]);

  return {
    isInitialized,
    faceDetected,
    error,
    debugInfo,
  };
}