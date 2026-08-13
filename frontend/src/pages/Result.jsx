import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PredictionCard from "../components/result/PredictionCard";
import ConfidenceBar from "../components/result/ConfidenceBar";
import MetadataCard from "../components/result/MetadataCard";
import DownloadCard from "../components/result/DownloadCard";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl">
              ?
            </div>

            <h1 className="text-3xl font-bold mb-3">
              No Analysis Found
            </h1>

            <p className="text-slate-400 mb-8">
              Upload an image to perform a new analysis.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="
                px-6
                py-3
                rounded-xl
                bg-cyan-500
                hover:bg-cyan-600
                font-semibold
                transition-all
                duration-300
              "
            >
              Analyze New Image
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const isFake = state.prediction?.toUpperCase() === "FAKE";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="mb-12">
            <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
              AI Analysis Complete
            </p>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-5xl font-bold">
                  Analysis Result
                </h1>

                <p className="text-slate-400 mt-3">
                  Detailed media authenticity and forensic analysis.
                </p>
              </div>

              <button
                onClick={() => navigate("/upload")}
                className="
                  px-5
                  py-3
                  rounded-xl
                  border
                  border-cyan-500
                  text-cyan-400
                  hover:bg-cyan-500
                  hover:text-slate-950
                  font-semibold
                  transition-all
                  duration-300
                "
              >
                Analyze Another
              </button>
            </div>
          </div>

          {/* Main Prediction */}
          <div
            className={`
              mb-8
              rounded-3xl
              border
              p-8
              ${
                isFake
                  ? "border-red-500/30 bg-red-500/5"
                  : "border-emerald-500/30 bg-emerald-500/5"
              }
            `}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              <div>
                <p className="text-sm text-slate-400 mb-2">
                  Detection Status
                </p>

                <h2
                  className={`
                    text-5xl
                    font-bold
                    ${
                      isFake
                        ? "text-red-400"
                        : "text-emerald-400"
                    }
                  `}
                >
                  {state.prediction}
                </h2>

                <p className="text-slate-400 mt-3">
                  AI model classification
                </p>
              </div>

              <div className="w-full md:w-1/2">
                <ConfidenceBar
                  confidence={state.confidence}
                />
              </div>

            </div>
          </div>

          {/* Metadata */}
          <div className="mb-8">
            <MetadataCard
              metadata={state.metadata}
            />
          </div>

          {/* Report */}
          <div className="mb-8">
            <DownloadCard
              report={state.report_name}
            />
          </div>

          {/* Hash */}
          <div className="
            bg-slate-900
            rounded-2xl
            p-6
            border
            border-slate-800
            hover:border-cyan-500/40
            transition
          ">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold">
                  SHA-256 Verification
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Unique cryptographic fingerprint of the uploaded image
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                VERIFIED
              </span>
            </div>

            <div className="
              bg-slate-950
              rounded-xl
              border
              border-slate-800
              p-4
            ">
              <p className="text-sm text-slate-400 break-all font-mono leading-relaxed">
                {state.sha256}
              </p>
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Result;