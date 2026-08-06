import { Link } from "react-router-dom";

function HistoryCard({ item }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 flex justify-between items-center">

      <div>
        <h2 className="text-xl font-bold">
          {item.prediction}
        </h2>

        <p className="text-slate-400">
          {item.filename}
        </p>

        <p className="text-cyan-400">
          {item.confidence}%
        </p>
      </div>

      <Link
        to={`/details/${item.analysis_id}`}
        className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold"
      >
        View Details
      </Link>

    </div>
  );
}

export default HistoryCard;