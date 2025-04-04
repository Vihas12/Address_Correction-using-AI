"use client";

import { useState, useEffect } from "react";
import CameraCapture from "@/component/cameraCapture";
import { extractTextFromImage } from "@/utils/imageProcessing";
import { useRouter } from "next/navigation";
// Define types for the API response
interface ApiResponse {
  extractedText: string;
  completedAddresses: string[];
}

export default function Hello() {
  const [extractedText, setExtractedText] = useState<string>("");
  // const [completedAddresses, setCompletedAddresses] = useState<string[]>([]);

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
      router.push("/cmopt", );
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
      {/* {completedAddresses.length > 0 && (
        <div>
          <h3>Completed Addresses:</h3>
          <ul>
            {completedAddresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}
