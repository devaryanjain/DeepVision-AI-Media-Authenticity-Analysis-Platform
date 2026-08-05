import { useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Result() {

  const { state } = useLocation();

  if (!state) {

    return (

      <div className="text-white text-center mt-20">

        No Result Found

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-10">

          Analysis Result

        </h1>

        <div className="bg-slate-900 rounded-2xl p-8 space-y-5">

          <p>

            <strong>Prediction:</strong> {state.prediction}

          </p>

          <p>

            <strong>Confidence:</strong> {state.confidence}

          </p>

          <p>

            <strong>SHA-256:</strong>

          </p>

          <p className="break-all text-slate-400">

            {state.sha256}

          </p>

          <p>

            <strong>Report:</strong>

            {" "}

            {state.report_name}

          </p>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Result;