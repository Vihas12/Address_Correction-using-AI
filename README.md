# 🏠 Indian Address Completion with OCR & Machine Learning

This project extracts handwritten or printed Indian addresses from uploaded images using **EasyOCR** and intelligently completes missing address components using a custom **ML model**. Ideal for digitizing delivery info, verifying user-submitted forms, or enhancing datasets with partial address information.

---

## 📸 How It Works

1. **User uploads an image** (containing an address).
2. The image is uploaded to **Cloudinary**.
3. The image URL is sent to the **OCR API** (EasyOCR-based).
4. Extracted text is parsed for address components.
5. An ML model fills in missing parts like district, pincode, or state.
6. Returns: Extracted text and completed address suggestions.

---

## 🚀 Tech Stack

| Layer         | Technology        |
|---------------|-------------------|
| 🧠 OCR         | [EasyOCR](https://github.com/JaidedAI/EasyOCR) |
| 🏗️ Backend API | FastAPI + Render for hosting |
| 📦 Storage     | Cloudinary (for image upload) |
| 🧪 ML Model    | Trained using Indian address datasets (city, area, pincode, etc.) |
| 🌐 Frontend    | Next.js (or your preferred framework) |

---

## 🧠 ML Model Details

The ML model is trained to:
- Predict missing fields in Indian addresses (district, pincode, etc.)
- Use partial information (e.g., city + area) to intelligently guess full addresses
- Trained using public datasets like:
  - Indian Postal Codes
  - City/District-State mappings

Model type: **k Nearest Neighbour** (configurable)  
Format: `.pkl` or `.joblib` for easy deployment

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Vihas12/Address_Correction-using-AI
cd address-completion-ocr

