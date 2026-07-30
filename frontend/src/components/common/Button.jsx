function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
}) {
  const base =
    "px-6 py-3 rounded-lg font-semibold transition duration-300";

  const styles = {
    primary:
      "bg-cyan-500 text-white hover:bg-cyan-400",

    secondary:
      "border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;