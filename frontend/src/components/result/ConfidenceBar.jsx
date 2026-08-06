function ConfidenceBar({ confidence }) {

  return (

    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

      <h3 className="text-slate-400 mb-4">
        Confidence
      </h3>

      <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">

        <div
          className="bg-cyan-400 h-5 rounded-full transition-all duration-700"
          style={{ width: `${confidence}%` }}
        />

      </div>

      <p className="mt-4 text-2xl font-bold">

        {confidence.toFixed(2)}%

      </p>

    </div>

  );

}

export default ConfidenceBar;