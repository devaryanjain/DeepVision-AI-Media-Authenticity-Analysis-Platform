import { FiDownload, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";

function DownloadCard({ report }) {
  function downloadReport() {
    if (!report) {
      toast.error("Report is not available.");
      return;
    }

    const reportUrl = `http://127.0.0.1:8000/reports/${encodeURIComponent(
      report
    )}`;

    window.open(reportUrl, "_blank");

    toast.success("Opening PDF report...");
  }

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

        <div className="flex items-start gap-4 min-w-0">

          <div className="
            w-12
            h-12
            shrink-0
            rounded-xl
            bg-red-500/10
            text-red-400
            flex
            items-center
            justify-center
            text-xl
          ">
            <FiFileText />
          </div>

          <div className="min-w-0">

            <h2 className="text-xl sm:text-2xl font-bold">
              PDF Forensic Report
            </h2>

            <p className="text-slate-400 text-sm mt-1 break-all">
              {report || "Report unavailable"}
            </p>

          </div>

        </div>

        <button
          onClick={downloadReport}
          disabled={!report}
          className="
            w-full
            sm:w-auto
            shrink-0
            inline-flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            rounded-xl
            bg-cyan-500
            hover:bg-cyan-600
            disabled:opacity-50
            disabled:cursor-not-allowed
            font-semibold
            transition-all
            duration-300
            hover:scale-[1.02]
          "
        >
          <FiDownload size={18} />
          Download Report
        </button>

      </div>

    </div>
  );
}

export default DownloadCard;