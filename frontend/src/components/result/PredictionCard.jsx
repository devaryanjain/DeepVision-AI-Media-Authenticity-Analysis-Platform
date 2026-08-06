function PredictionCard({ prediction }) {
  const isFake = prediction === "FAKE";

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

      <h3 className="text-slate-400 mb-3">
        Prediction
      </h3>

      <div
        className={`inline-block px-6 py-2 rounded-full font-bold text-lg
        ${
          isFake
            ? "bg-red-500/20 text-red-400"
            : "bg-green-500/20 text-green-400"
        }`}
      >
        {prediction}
      </div>

    </div>
  );
}

export default PredictionCard;