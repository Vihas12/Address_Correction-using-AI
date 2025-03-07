"use client";

import React, { useState, useRef, useEffect } from 'react';

const CameraInput: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('Permission denied')) {
          alert('Camera permission denied. Please allow camera access in your browser settings.');
        }
        console.error('Error accessing camera:', error.message);
      } else {
        console.error('An unknown error occurred:', error);
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
        const capturedImage = canvas.toDataURL('image/png');
        setImage(capturedImage);
      }
    }
  };

  const saveImage = () => {
    if (image) {
      // Create a link element for downloading the image
      const link = document.createElement('a');
      link.href = image;
      link.download = 'captured_image.png'; // Set the image name for download
      link.click(); // Trigger the download
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
          <h3>Captured Image Preview:</h3>
          <img src={image} alt="Captured" style={{ maxWidth: '100%', marginBottom: '20px' }} />
          <br />
          <button onClick={saveImage} style={{ padding: '10px 20px', fontSize: '18px' }}>
            Save Image
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </div>
  );
};

export default CameraInput;
