import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { getBaseUrl } from "../../utils/baseURL";
import { useNavigate } from "react-router-dom"; // For navigation

function WebcamCapture() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skinType, setSkinType] = useState(null); // To store skin type
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      setAnalysisResult(null); // Clear previous results on new capture
      setSkinType(null); // Reset skin type when capturing a new image
    } else {
      console.error("Failed to capture screenshot.");
      alert("Image capture failed. Try again.");
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      alert("Capture an image first!");
      return;
    }
    setLoading(true);
    setAnalysisResult(null); // Clear previous results

    try {
      // Convert base64 to a Blob (binary data)
      const response = await fetch(image);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob, "image.jpg"); // Attach the image blob to the form data

      const apiUrl = `${getBaseUrl()}/api/skin/analyze`; // Ensure this is the correct backend URL

      // Send image data to backend for analysis
      const backendResponse = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!backendResponse.ok) throw new Error("Failed to analyze the image.");
      
      const result = await backendResponse.json();
      console.log("Analysis Result:", result); // Log the result from backend

      setAnalysisResult(result);

      // Extract and set the skin type from the response
      const skinTypeResult = result?.result?.skin_type?.skin_type;
      console.log("Skin Type Result:", skinTypeResult); // Log the skin type value

      if (skinTypeResult !== undefined && skinTypeResult !== null) {
        setSkinType(skinTypeResult); // Save skin type (0: Oily, 1: Dry, etc.)
        console.log("Skin Type set:", skinTypeResult); // Log when skin type is set
      } else {
        console.error("Skin type not found in response");
        alert("Skin type could not be determined. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Capture your entire face and try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const skinTypeLabel = skinTypeLabels[skinType] || ""; // Get the label for the skin type
    console.log("Navigating to search with skin type:", skinTypeLabel); // Log before navigation
    navigate("/search", { state: { skinTypeLabel } }); // Pass only the skin type label
  };
  
  

  const skinTypeLabels = ["Oily", "Dry", "Normal", "Combination"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col items-center p-6 shadow-lg rounded-lg bg-white">

        {/* Display Skin Type Result */}
        {analysisResult && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-md text-center w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Skin Analysis Result</h3>
            <p className="text-gray-700">
              <strong>Skin Type:</strong> {skinTypeLabels[skinType] || "N/A"}
            </p>
            {/* Search Button: Visible only when skin type is determined */}
         {skinType !== null && (
          <button
            onClick={handleSearch}
            className="mt-6 btn bg-primary text-white"
          >
            Search Products for Your Skin Type
          </button>
        )}
          </div>
        )}
         

        {/* Webcam or Captured Image */}
        <div className="relative flex justify-center items-center w-full mb-4">
          {!image ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg shadow-lg"
            />
          ) : (
            <div className="relative">
              <img src={image} alt="Captured" className="rounded-lg shadow-lg" />
              {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <p className="text-white text-lg font-bold">Analyzing...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Buttons for Capture, Retake, and Analyze */}
        <div className="flex space-x-4">
          {!image ? (
            <button onClick={capture} className="btn">
              Capture Image
            </button>
          ) : (
            <>
              <button onClick={() => setImage(null)} className="btn">
                Retake
              </button>
              <button onClick={analyzeImage} className="btn">
                Analyze Skin
              </button>
            </>
          )}
        </div>

       
        
      
        
      </div>
    </div>
  );
}

export default WebcamCapture;
