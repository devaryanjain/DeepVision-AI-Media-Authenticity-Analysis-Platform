import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import HistoryCard from "../components/history/HistoryCard";
import SearchBar from "../components/history/SearchBar";
import EmptyHistory from "../components/history/EmptyHistory";
import LoadingSpinner from "../components/common/LoadingSpinner";

function History() {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const res = await api.get("/history");

      setHistory(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  function handleSearch(value) {
    const text = value.toLowerCase();

    const result = history.filter((item) =>
      item.filename.toLowerCase().includes(text)
    );

    setFiltered(result);
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      <Navbar />

      <main className="max-w-6xl mx-auto w-full px-6 py-16 flex-1">

        <h1 className="text-5xl font-bold mb-8">
          Analysis History
        </h1>

        <SearchBar onSearch={handleSearch} />

        {filtered.length === 0 ? (
          <EmptyHistory />
        ) : (
          <div className="space-y-6 mt-8">

            {filtered.map((item) => (
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