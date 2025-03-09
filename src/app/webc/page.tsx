"use client";

import React, { useState, useEffect, useRef } from "react";

function Webcam() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);

  const [hasPhoto, setPhoto] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      getVideo();
    }
  }, [isMobile]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const takePhoto = () => {
    const width = 400;
    const height = width / (16 / 9);

    const video = videoRef.current;
    const photo = photoRef.current;

    if (photo && video) {
      photo.width = width;
      photo.height = height;

      const ctx = photo.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        setPhoto(true);
      }
    }
  };

  const closePhoto = () => {
    const photo = photoRef.current;
    if (photo) {
      const ctx = photo.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, photo.width, photo.height);
      }
      setPhoto(false);
    }
  };

  return (
    <div>
      {isMobile ? (
        <div className="pt-25 min-h-screen relative bg-gray-800 m-15 p-15 rounded-2xl shadow-lg">
          <div className="relative">
            <video className="w-full max-w-full h-auto" ref={videoRef}></video>
            <button
              className="absolute bottom-5 left-5 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold transition-all duration-400 hover:from-pink-500 hover:to-purple-500"
              onClick={takePhoto}
            >
              SNAP
            </button>
          </div>
          <div
            className={`fixed top-12 left-0 w-full h-full flex justify-center bg-black p-4 sm:p-8 md:p-20 transition-transform duration-500 ${
              hasPhoto ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="relative w-full max-w-lg">
              <canvas
                className="w-full h-auto rounded-lg shadow-lg"
                ref={photoRef}
              ></canvas>
              <button
                className="absolute top-50 left-4 sm:left-8 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl sm:text-2xl font-bold transition-all duration-400 hover:from-pink-500 hover:to-purple-500"
                onClick={closePhoto}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-15 pt-25 mt-16 bg-blue-100 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold">Mobile Exclusive Feature</h2>
          <p className="text-lg">
            Capture an image of a handwritten address and let our AI model
            complete the address for you with incredible accuracy.
          </p>
          <p className="text-lg">
            Enjoy real-time suggestions and address corrections directly on your
            Mobile
          </p>
        </div>
      )}
    </div>
  );
}

export default Webcam;
