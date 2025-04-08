'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import aboutai from '@/images/about-ai.png'; // Ensure this path is correct
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 pt-28 pb-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Side: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <Image
            src={aboutai} // Make sure this image exists in your public folder
            alt="AI Address Illustration"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </motion.div>

        {/* Right Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <h1 className="text-5xl font-extrabold mb-6 text-blue-600">About <span className="text-black">AI Adder</span></h1>
          <p className="mb-4 text-lg leading-relaxed">
            <span className="font-semibold">AI Adder</span> is a smart address completion platform powered by advanced AI. It helps users auto-complete address fields quickly and accurately using models trained on real-world data.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            Whether you're a developer integrating form inputs or a business improving user experience, AI Adder simplifies data entry for everyone.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            Our goal is to make digital interaction seamless, intuitive, and lightning-fast.
            We're constantly improving our models and adding features to help you work smarter.
          </p>
        </motion.div>
      </div>

      {/* Additional Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-semibold text-blue-500 mb-4">Smart. Fast. Accurate.</h2>
        <p className="text-lg max-w-3xl mx-auto">
          Say goodbye to incomplete forms and incorrect addresses. Let AI Adder do the heavy lifting with powerful AI-driven automation.
        </p>
      </motion.div>
    </div>
  );
}
