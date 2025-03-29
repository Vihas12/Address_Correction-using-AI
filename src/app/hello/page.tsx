"use client";

import { useState } from "react";
import CameraCapture from "@/component/cameraCapture";
import { extractTextFromImage } from "@/utils/imageProcessing";

export default function Hello() {
  const [extractedText, setExtractedText] = useState("");

  const handleImageCapture = async (file: File) => {
    console.log("Captured image:", file.name);
    const text = await extractTextFromImage(file);
    setExtractedText(text);
  };

  return (
    <div>
      <CameraCapture onImageCaptured={handleImageCapture} />
      <div>
        <h3>Extracted Text:</h3>
        <p>{extractedText || "No text extracted yet."}</p>
      </div>
    </div>
  );
}
