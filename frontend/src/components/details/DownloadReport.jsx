function DownloadReport({ report }) {

  function downloadReport() {
    window.open(
      `http://127.0.0.1:8000/reports/${report}`,
      "_blank"
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">

      <h2 className="text-2xl font-bold mb-4">
        PDF Report
      </h2>

      <p className="text-slate-400 mb-6">
        {report}
      </p>

      <button
        onClick={downloadReport}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
      >
        Download Report
      </button>

    </div>
  );
}

export default DownloadReport;