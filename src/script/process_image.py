import cv2
import easyocr
import sys

# Check if the user has passed an image path as a command-line argument
if len(sys.argv) < 2:
    print('Error: Please provide an image path as a command-line argument.')
    sys.exit(1)

# Get the image path from the command-line argument
image_path = sys.argv[1]

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'])

try:
    # Read the image
    image = cv2.imread(image_path)

    if image is None:
        print('Error: Could not read image')
        sys.exit(1)

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Optional preprocessing
    gray = cv2.resize(gray, (800, 600))

    # Use EasyOCR to read text from the image
    results = reader.readtext(gray)

    # Collect detected text
    detected_text = []
    for (_, text, prob) in results:
        detected_text.append(f'{text} (Confidence: {prob:.4f})')

    # Print the detected text so the Node.js API can capture it
    print('\n'.join(detected_text))

except Exception as e:
    print(f'Error processing image: {e}')
    sys.exit(1)
