import { useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PredictionCard from "../components/result/PredictionCard";
import ConfidenceBar from "../components/result/ConfidenceBar";
import MetadataCard from "../components/result/MetadataCard";
import DownloadCard from "../components/result/DownloadCard";

function Result() {

  const { state } = useLocation();

  if (!state) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-3xl font-bold">

          No Analysis Found

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold mb-12">

          Analysis Result

        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          <PredictionCard
            prediction={state.prediction}
          />

          <ConfidenceBar
            confidence={state.confidence}
          />

        </div>

        <div className="mt-8">

          <MetadataCard
            metadata={state.metadata}
          />

        </div>

        <div className="mt-8">

          <DownloadCard
            report={state.report_name}
          />

        </div>

        <div className="mt-8 bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <h3 className="text-xl font-bold mb-4">

            SHA-256 Hash

          </h3>

          <p className="text-slate-400 break-all">

            {state.sha256}

          </p>

        </div>

      </section>

      <Footer />

    </div>

  );

}

export default Result;