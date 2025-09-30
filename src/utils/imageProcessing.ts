let completedAddress: string[] = [];
let imageurl = ""; 

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
    // Step 1: Convert File to Base64
    const base64 = await fileToBase64(imageFile);

    // Step 2: Upload image to Cloudinary via API
    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 }),
    });

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed");
    }

    const { url } = await uploadResponse.json();

    imageurl = url; 

    // Step 3: Extract text from image using /api/extract
    const ocrResponse = await fetch("/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: url }),
    });

    if (!ocrResponse.ok) {
      throw new Error("OCR extraction failed");
    }

    const { extractedText } = await ocrResponse.json();

    // Step 4: Complete address using /api/address-complete
    const addressResponse = await fetch("/api/address-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: extractedText }),
    });

    if (!addressResponse.ok) {
      throw new Error("Address completion failed");
    }

    const addressData = await addressResponse.json();
    const completedAddresses = (addressData.completedAddresses || []).map((addr: string) =>
      addr.replace(/(\d{6})\.0/, "$1") // remove trailing `.0` after 6-digit pincode
    );
    
    completedAddress = completedAddresses; // Store addresses globally

    const address = { 
      addressUrl:url ,
      extractedText:extractedText,
      addressList:completedAddresses,
      correctAddress:[]
    };

    // Storing the completed addresses in local storage
    try {
      const res = await fetch("/api/addressdb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });

      if (!res.ok) {
        throw new Error("Failed to store completed addresses");
      }
    }catch (error) {
      console.error("Error storing completed addresses:", error);
    }


    return  extractedText && completedAddresses.length
      ? {
          extractedText,
          completedAddresses,
        }
      : "No text or address found.";
  } catch (error) {
    console.error("Error in image processing pipeline:", error);
    return "Error processing image.";
  }
};

// ✅ Function to Retrieve Completed Addresses
export const getCompletedAddresses = (): string[] => {
  return completedAddress;
};

export const getImageUrl = (): string => {
  return imageurl;
};

