import { useNavigate } from "react-router-dom";

function HistoryCard({ item }) {
  const navigate = useNavigate();

  function handleDetails() {
    navigate(`/details/${item.analysis_id}`);
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

        <div className="min-w-0">

          <p
            className={`font-bold text-lg ${
              item.prediction === "REAL"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {item.prediction}
          </p>

          <p className="text-cyan-400 text-sm break-all mt-1">
            {item.filename}
          </p>

          <p className="text-cyan-400 text-sm mt-1">
            {item.confidence}%
          </p>

        </div>

        <button
          onClick={handleDetails}
          className="
            w-full
            sm:w-auto
            shrink-0
            px-5
            py-3
            rounded-lg
            bg-cyan-500
            hover:bg-cyan-600
            text-white
            font-semibold
            transition
          "
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default HistoryCard;