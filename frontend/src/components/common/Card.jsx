function Card({ children }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        backdrop-blur-md
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-cyan-500
        hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]
      "
    >
      {children}
    </div>
  );
}

export default Card;