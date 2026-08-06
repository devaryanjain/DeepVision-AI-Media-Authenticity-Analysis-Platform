function ImageInfo({ metadata }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Image Information
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <Stat title="Width" value={metadata.width} />
        <Stat title="Height" value={metadata.height} />
        <Stat title="File Size (KB)" value={metadata.file_size} />

      </div>

    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-slate-950 rounded-lg p-5">
      <p className="text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-cyan-400">{value}</p>
    </div>
  );
}

export default ImageInfo;