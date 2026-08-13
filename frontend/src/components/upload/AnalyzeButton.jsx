import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AnalyzeButton({ image }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!image || loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await api.post("/predict", formData);

      console.log("Prediction response:", response.data);

      navigate("/result", {
        state: response.data,
      });
    } catch (error) {
      console.error("Prediction error:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
        alert(
          `Prediction failed.\n\nBackend error: ${
            error.response.data?.detail || "Unknown error"
          }`
        );
      } else {
        alert(
          "Prediction failed.\n\nMake sure the FastAPI backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  if (!image) return null;

  return (
    <div className="text-center mt-10">
      <button
        type="button"
        onClick={handleAnalyze}
        disabled={loading}
        className="
          px-12
          py-4
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-600
          text-lg
          font-semibold
          transition-all
          duration-300
          hover:scale-105
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:scale-100
        "
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {loading && (
        <p className="mt-4 text-sm text-slate-400">
          AI model is analyzing your image...
        </p>
      )}
    </div>
  );
}

export default AnalyzeButton;