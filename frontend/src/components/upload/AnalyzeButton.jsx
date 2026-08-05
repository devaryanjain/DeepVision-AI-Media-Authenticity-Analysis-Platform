import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AnalyzeButton({ image }) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {

    if (!image) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("file", image);

    try {

      const response = await api.post(
        "/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/result", {
        state: response.data,
      });

    } catch (error) {

      console.log(error);

      alert("Prediction failed.");

    }

    setLoading(false);

  }

  if (!image) return null;

  return (

    <div className="text-center mt-10">

      <button
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
        disabled:opacity-50
        "
      >

        {loading ? "Analyzing..." : "Analyze Image"}

      </button>

    </div>

  );

}

export default AnalyzeButton;