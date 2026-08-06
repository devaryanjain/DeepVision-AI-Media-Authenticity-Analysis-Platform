function HashCard({ hash }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        SHA-256 Hash
      </h2>

      <div className="bg-slate-950 rounded-lg p-4 break-all text-slate-300 font-mono">
        {hash}
      </div>

    </div>
  );
}

export default HashCard;