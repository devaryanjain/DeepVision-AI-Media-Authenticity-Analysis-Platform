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

  useEffect(() => {
    loadAnalysis();
  }, []);

  async function loadAnalysis() {
    const res = await api.get(`/history/${id}`);
    setAnalysis(res.data);
  }

  if (!analysis) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Navbar />

      <main className="max-w-6xl mx-auto w-full px-6 py-16 flex-1">

        <h1 className="text-5xl font-bold mb-10">
          Analysis Details
        </h1>

        <PredictionBanner analysis={analysis} />

        <MetadataGrid metadata={analysis.metadata} />

        <ImageInfo metadata={analysis.metadata} />

        <HashCard hash={analysis.sha256} />

        <DownloadReport report={analysis.report_name} />

      </main>

      <Footer />

    </div>
  );
}

export default Details;