export const extractTextFromImage = async (imageFile: File): Promise<string> => {
  console.log("Processing image:", imageFile.name);

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
    return data.text || "No text detected.";
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
