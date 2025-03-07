"use client";

import React, { useState, useRef } from 'react';

const CameraInput: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestCameraPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });

      if (permission.state === 'denied') {
        alert('Camera permission denied. Please enable camera access in your browser settings.');
        console.error('Camera permission denied');
        return;
      }

      startCamera();
    } catch (error: unknown) {
      // We explicitly type error as any so we can log it
      if (error instanceof Error) {
        console.error('Error checking camera permission:', error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error: unknown) {
      // Handle the error explicitly
      if (error instanceof Error) {
        console.error('Error accessing camera:', error.message);
      } else {
        console.error('An unknown error occurred while accessing the camera:', error);
      }
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL('image/png'));
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {!showCamera && (
        <button onClick={requestCameraPermission} style={{ fontSize: '24px', padding: '10px 20px' }}>
          📸 Open Camera
        </button>
      )}

      {showCamera && (
        <div>
          <video
            ref={videoRef}
            width="100%"
            height="auto"
            autoPlay
            playsInline
            style={{ border: '1px solid #ddd', marginTop: '10px' }}
          />
          <button onClick={captureImage} style={{ marginTop: '10px', padding: '10px 20px' }}>
            Capture Image
          </button>
        </div>
      )}

      {image && (
        <div>
          <h3>Captured Image:</h3>
          <img src={image} alt="Captured" style={{ maxWidth: '100%' }} />
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </div>
  );
};

export default CameraInput;
