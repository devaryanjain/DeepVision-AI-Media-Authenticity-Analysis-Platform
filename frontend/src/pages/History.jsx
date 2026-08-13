import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiBarChart2, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import api from "../services/api";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import HistoryCard from "../components/history/HistoryCard";
import EmptyHistory from "../components/history/EmptyHistory";
import LoadingSpinner from "../components/common/LoadingSpinner";
import HistoryChart from "../components/history/HistoryChart";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const response = await api.get("/history");
      setHistory(response.data || []);
    } catch (error) {
      console.error("History loading failed:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredHistory = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return history;

    return history.filter((item) =>
      item.filename?.toLowerCase().includes(text)
    );
  }, [history, search]);

  const total = history.length;

  const realCount = history.filter(
    (item) => item.prediction?.toUpperCase() === "REAL"
  ).length;

  const fakeCount = history.filter(
    (item) => item.prediction?.toUpperCase() === "FAKE"
  ).length;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto w-full px-6 py-16 flex-1">

        {/* Header */}
        <div className="mb-10">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Analysis Records
          </p>

          <h1 className="text-5xl font-bold">
            Analysis History
          </h1>

          <p className="text-slate-400 mt-3">
            Review previous AI-powered media authenticity analyses.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <FiBarChart2 className="text-cyan-400 text-2xl mb-4" />

            <p className="text-sm text-slate-400">
              Total Analyses
            </p>

            <p className="text-3xl font-bold text-cyan-400 mt-1">
              {total}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <FiCheckCircle className="text-emerald-400 text-2xl mb-4" />

            <p className="text-sm text-slate-400">
              Real Images
            </p>

            <p className="text-3xl font-bold text-emerald-400 mt-1">
              {realCount}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <FiAlertTriangle className="text-red-400 text-2xl mb-4" />

            <p className="text-sm text-slate-400">
              Fake Images
            </p>

            <p className="text-3xl font-bold text-red-400 mt-1">
              {fakeCount}
            </p>
          </div>

        </div>

        {/* Chart */}
        {history.length > 0 && (
          <div className="mb-8">
            <HistoryChart history={history} />
          </div>
        )}

        {/* Search */}
        <div className="relative mb-8">
          <FiSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
            size={20}
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search analyses by filename..."
            className="
              w-full
              bg-slate-900
              border
              border-slate-800
              rounded-xl
              py-4
              pl-12
              pr-4
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-cyan-500
              transition
            "
          />
        </div>

        {/* Results */}
        {filteredHistory.length === 0 ? (
          <EmptyHistory />
        ) : (
          <div className="space-y-5">

            {filteredHistory.map((item) => (
              <HistoryCard
                key={item.analysis_id}
                item={item}
              />
            ))}

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default History;