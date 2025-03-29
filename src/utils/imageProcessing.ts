interface ApiResponse {
  extracted_text: string;
  completed_addresses: string[];
}

export const extractTextFromImage = async (imageFile: File): Promise<{ extractedText: string; completedAddresses: string[] } | string> => {

  // Prepare the form data for API request
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch("http://127.0.0.1:5000/ocr", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to extract text");
    }
  
    const data = await response.json();
  
    // Return both the extracted text and the completed addresses
    if (data.extracted_text && data.completed_addresses.length > 0) {
      return {
        extractedText: data.extracted_text,
        completedAddresses: data.completed_addresses,
      } as { extractedText: string; completedAddresses: string[] };
    }
  
    return "No text or address found.";
  } catch (error) {
    console.error("OCR API error:", error);
    return "Error processing image.";
  }
  
};

/**
 * Converts a base64 string to a File object
 */
export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
