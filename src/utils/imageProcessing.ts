
interface ApiResponse {
  extracted_text: string;
  completed_addresses: string[];
}

// ✅ Utility function: Convert File to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// ✅ Utility function: Convert Base64 to File
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

// ✅ Main Function: Upload & Extract Text
export const extractTextFromImage = async (
  imageFile: File
): Promise<{ extractedText: string; completedAddresses: string[] } | string> => {
  try {
    // Convert File to Base64
    const base64 = await fileToBase64(imageFile); // 🔥 Fix here (Using the correct function)

    console.log("Base64 Image:", base64); 
    console.log("Image File:", imageFile); 
    // Debugging line
    // Upload image to Cloudinary via API
    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 }),
    });

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed");
    }

    const { url } = await uploadResponse.json();

    console.log("Cloudinary URL:", url); // Debugging line
    
    // Send Cloudinary URL to OCR API
    const ocrResponse = await fetch(
      "https://address-api-vihas12s-projects.vercel.app/ocr",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: url }),
      }
    );

    if (!ocrResponse.ok) {
      throw new Error("Failed to extract text");
    }

    const data: ApiResponse = await ocrResponse.json();

    return data.extracted_text && data.completed_addresses.length > 0
      ? { extractedText: data.extracted_text, completedAddresses: data.completed_addresses }
      : "No text or address found.";
  } catch (error) {
    console.error("OCR API error:", error);
    return "Error processing image.";
  }
};
