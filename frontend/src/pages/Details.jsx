import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LoadingSpinner from "../components/common/LoadingSpinner";

import PredictionBanner from "../components/details/PredictionBanner";
import MetadataGrid from "../components/details/MetadataGrid";
import HashCard from "../components/details/HashCard";
import DownloadReport from "../components/details/DownloadReport";
import ImageInfo from "../components/details/ImageInfo";

function Details() {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, [id]);

  async function loadAnalysis() {
    try {
      setError(false);

      const res = await api.get(`/history/${id}`);

      setAnalysis(res.data);
    } catch (err) {
      console.error("Failed to load analysis:", err);
      setError(true);
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Analysis Not Found
            </h1>

            <p className="text-slate-400">
              The requested analysis could not be loaded.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!analysis) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Navbar />

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 flex-1">

        <div className="mb-8 sm:mb-10">
          <p className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">
            Analysis Record
          </p>

          <h1 className="text-3xl sm:text-5xl font-bold">
            Analysis Details
          </h1>
        </div>

        <div className="space-y-6 sm:space-y-8">

          <PredictionBanner analysis={analysis} />

          <MetadataGrid metadata={analysis.metadata} />

          <ImageInfo metadata={analysis.metadata} />

          <HashCard hash={analysis.sha256} />

          <DownloadReport report={analysis.report_name} />

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Details;