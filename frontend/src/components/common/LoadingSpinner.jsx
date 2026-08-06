function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="h-16 w-16 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;