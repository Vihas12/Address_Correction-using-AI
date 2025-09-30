"use client";

import { useState } from 'react';
import { CameraIcon, InfoIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import aiimage from '@/images/ai-images.jpg';
import easyocr from '@/images/merged-text-detection.png';
import map from '@/images/map-images.jpg';



const Dashboard = () => {
    const [showMobileBlock, setShowMobileBlock] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-100 p-15 pt-25 pb-60 flex justify-center">
      <div className="w-full max-w-4xl space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition-transform"
        >
          <Image
            src={aiimage}
            alt="AI Address Completion Demo"
            className="rounded-2xl shadow-lg w-full"
          />
          <div>
            <h1 className="text-4xl font-bold mb-6">AI-Powered Address Completion</h1>
            <p className="text-lg mb-4">
              Our advanced AI model helps complete incomplete addresses by extracting
              handwritten and printed text from images and suggesting address information.
            </p>
            <p className="text-lg">
              This technology reduces manual data entry and minimizes errors, making
              address input faster and more reliable.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition-transform"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <InfoIcon className="mr-2" /> Powered by EasyOCR
            </h2>
            <p className="text-lg mb-4">
              We use the EasyOCR model for highly accurate text extraction from
              handwritten documents. This model ensures precise recognition,
              enabling seamless address completion.
            </p>
            <p className="text-lg">
              EasyOCR works efficiently with a wide range of various handwriting styles, ensuring maximum coverage and accuracy.
            </p>
          </div>
          <Image
            src={easyocr as StaticImageData}
            alt="EasyOCR Model Demo"
            className="rounded-2xl shadow-lg w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 transform hover:scale-105 transition-transform"
        >
          <Image
            src={map as StaticImageData}
            alt="Mobile-Friendly Demo"
            className="rounded-2xl shadow-lg w-full"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <CameraIcon className="mr-2" /> Mobile-Friendly Experience
            </h2>
            <p className="text-lg mb-4">
              Our web application is designed primarily for mobile use, allowing users to
              capture images of handwritten addresses directly from their
              phone’s camera and receive intelligent address suggestions.
            </p>
            <p className="text-lg">
              The mobile-first approach ensures accessibility and convenience,
              enabling address completion on the go with ease and accuracy.
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600"
              onClick={() => setShowMobileBlock(true)}
            >
              Try Address Completion
            </button>
          </div>
        </motion.div>

        {showMobileBlock && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-16 bg-blue-100 rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold">Mobile Exclusive Feature</h2>
            <p className="text-lg">
              Capture an image of a handwritten address and let our AI model
              complete the address for you with incredible accuracy.
            </p>
            <p className="text-lg">
              Enjoy real-time suggestions and address corrections directly on your
              mobile device.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
