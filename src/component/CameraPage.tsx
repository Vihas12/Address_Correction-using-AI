"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CameraCapture from "@/component/cameraCapture";
import { extractTextFromImage } from "@/utils/imageProcessing";

interface ApiResponse {
  extractedText: string;
  completedAddresses: string[];
}

const CameraPage = () => {
  const [extractedText, setExtractedText] = useState<string>("");
  const router = useRouter();

  const handleImageCapture = async (file: File) => {
    try {
      const response: ApiResponse = await extractTextFromImage(file);
      if (response.extractedText) {
        setExtractedText(response.extractedText);
      }
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  useEffect(() => {
    if (extractedText) {
      router.push("/cmopt");
    }
  }, [extractedText, router]);

  return (
    <div>
      <CameraCapture onImageCaptured={handleImageCapture} />
      {extractedText && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default CameraPage;
