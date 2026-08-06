function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by filename..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-3 outline-none"
    />
  );
}

export default SearchBar;