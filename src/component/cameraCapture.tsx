
import React, { useRef, useState, useCallback } from 'react';
import { Camera, Image as ImageIcon, RotateCcw } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { base64ToFile } from '@/utils/imageProcessing';

interface CameraCaptureProps {
  onImageCaptured: (file: File) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCaptured }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    try {
      const constraints = { 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 } 
        } 
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setStream(mediaStream);
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access the camera. Please make sure you have granted camera permissions.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  }, [stream]);

  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame onto the canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert the canvas to a data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      
      // Stop the camera
      stopCamera();
      
      // Convert to file and pass to parent component
      const imageFile = base64ToFile(imageDataUrl, 'captured-address.jpg');
      onImageCaptured(imageFile);
    }
  }, [onImageCaptured, stopCamera]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  // Clean up camera stream when component unmounts
  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="glass-panel p-4 rounded-xl w-full max-w-lg mx-auto">
      <div className="aspect-[4/3] bg-gray-100 relative rounded-lg overflow-hidden">
        {capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured address" 
            className="w-full h-full object-cover animate-fade-in"
          />
        ) : (
          <video 
            ref={videoRef} 
            className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
            autoPlay 
            playsInline 
            muted
          />
        )}
        
        {!isCameraActive && !capturedImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ImageIcon size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm">No camera active</p>
          </div>
        )}
        
        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <div className="mt-4 flex gap-3 justify-center">
        {!isCameraActive && !capturedImage && (
          <button
            onClick={startCamera}
            disabled={isLoading}
            className="h-12 px-5 rounded-full shadow-button transition-all hover:shadow-lg"
          >
            <Camera className="mr-2 h-4 w-4" />
            {isLoading ? 'Starting Camera...' : 'Start Camera'}
          </button>
        )}
        
        {isCameraActive && (
          <button
            onClick={captureImage}
            className="h-12 px-6 rounded-full shadow-button bg-primary hover:bg-primary/90 transition-all"
          >
            <Camera className="mr-2 h-4 w-4" />
            Capture Address
          </button>
        )}
        
        {capturedImage && (
          <button
            onClick={retakePhoto}
            // variant="outline"
            className="h-12 px-5 rounded-full shadow-button transition-all hover:shadow-lg"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Photo
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
