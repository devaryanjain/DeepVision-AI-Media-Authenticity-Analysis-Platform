import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../common/Button";

function Hero() {
  return (
    <section className="relative overflow-hidden flex items-center justify-center px-6 py-28">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[120px]" />

      </div>

      <motion.div
        className="relative z-10 max-w-4xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <p className="text-cyan-400 font-semibold tracking-[0.25em] uppercase mb-6">
          AI-Powered Media Authenticity Analysis
        </p>

        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8">
          Detect
          <span className="text-cyan-400"> Deepfakes </span>
          With AI
        </h1>

        <p className="text-xl text-slate-300 leading-9 max-w-3xl mx-auto mb-12">
          Analyze digital media using EfficientNet-B0,
          metadata forensics, SHA-256 verification and
          automatically generate professional forensic reports.
        </p>

        <div className="flex justify-center gap-6">

          <Link to="/upload">
            <Button>
              Analyze Image
            </Button>
          </Link>

          <Link to="/history">
            <Button variant="secondary">
              View History
            </Button>
          </Link>

        </div>

      </motion.div>

    </section>
  );
}

export default Hero;