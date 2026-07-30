function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">

        <h2 className="text-2xl font-bold text-cyan-400">
          DeepVision AI
        </h2>

        <p className="text-slate-400 mt-3">
          AI-Powered Media Authenticity Analysis Platform
        </p>

        <div className="flex justify-center gap-6 mt-6 text-slate-500 text-sm">
          <span>React</span>
          <span>FastAPI</span>
          <span>MongoDB</span>
          <span>EfficientNet-B0</span>
        </div>

        <p className="text-slate-500 mt-8 text-sm">
          © 2026 DeepVision AI. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;