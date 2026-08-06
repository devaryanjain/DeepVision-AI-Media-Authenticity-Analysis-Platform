function PredictionBanner({ analysis }) {
  const real = analysis.prediction === "REAL";

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8 flex justify-between items-center">

      <div>
        <p className="text-slate-400 text-lg">
          Prediction
        </p>

        <h2
          className={`text-5xl font-bold ${
            real ? "text-green-400" : "text-red-400"
          }`}
        >
          {analysis.prediction}
        </h2>
      </div>

      <div className="text-right">
        <p className="text-slate-400">
          Confidence
        </p>

        <h2 className="text-4xl font-bold text-cyan-400">
          {analysis.confidence}%
        </h2>
      </div>

    </div>
  );
}

export default PredictionBanner;