function EmptyHistory() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
      <div className="text-6xl mb-6">📂</div>

      <h2 className="text-2xl font-bold text-white">
        No analyses found
      </h2>

      <p className="text-slate-400 mt-3">
        Upload your first image to start using DeepVision AI.
      </p>
    </div>
  );
}

export default EmptyHistory;