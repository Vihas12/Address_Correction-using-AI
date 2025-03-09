"use client";

import React, { useState, useEffect, useRef } from 'react';

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
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            getVideo();
        }
    }, [isMobile]);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                video: { width: 1920, height: 2000 }
            })
            .then((stream) => {
                const video = videoRef.current;
                if (video) {
                    video.srcObject = stream;
                    video.play();
                }
            })
            .catch((err) => {
                console.error('error:', err);
            });
    };

    const takePhoto = () => {
        const width = 414;
        const height = width / (16 / 9);

        const video = videoRef.current;
        const photo = photoRef.current;

        if (photo && video) {
            photo.width = width;
            photo.height = height;

            const ctx = photo.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, width, height);
                setPhoto(true);
            }
        }
    };

    const closePhoto = () => {
        const photo = photoRef.current;
        if (photo) {
            const ctx = photo.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, photo.width, photo.height);
            }
            setPhoto(false);
        }
    };

    return (
        <div>
            {isMobile ? (
                <div className="min-h-screen relative bg-gray-800">
                    <div className="relative">
                        <video className="w-full max-w-full h-auto" ref={videoRef}></video>
                        <button 
                            className="absolute bottom-5 left-5 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold transition-all duration-400 hover:from-pink-500 hover:to-purple-500"
                            onClick={takePhoto}
                        >
                            SNAP
                        </button>
                    </div>
                    <div className={`fixed top-0 left-0 w-full h-full flex items-center bg-black transition-transform duration-500 ${hasPhoto ? 'translate-x-0' : 'translate-x-full'}`}>
                        <canvas className="w-full h-1/2" ref={photoRef}></canvas>
                        <button 
                            className="absolute bottom-5 left-5 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold transition-all duration-400 hover:from-pink-500 hover:to-purple-500"
                            onClick={closePhoto}
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            ) : (
                <h1>Desktop</h1>
            )}
        </div>
    );
}

export default Webcam;
