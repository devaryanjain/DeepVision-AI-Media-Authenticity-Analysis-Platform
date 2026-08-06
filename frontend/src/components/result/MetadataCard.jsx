function MetadataCard({ metadata }) {

  return (

    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

      <h3 className="text-2xl font-bold mb-6">
        Metadata
      </h3>

      <div className="grid md:grid-cols-2 gap-5">

        <Item title="Filename" value={metadata.filename} />
        <Item title="Format" value={metadata.format} />
        <Item title="Resolution" value={`${metadata.width} × ${metadata.height}`} />
        <Item title="Color Mode" value={metadata.color_mode} />
        <Item title="Camera" value={metadata.camera_model || "Unknown"} />
        <Item title="Software" value={metadata.software || "Unknown"} />

      </div>

    </div>

  );

}

function Item({ title, value }) {

  return (

    <div>

      <p className="text-slate-400">
        {title}
      </p>

      <p className="font-semibold">
        {value}
      </p>

    </div>

  );

}

export default MetadataCard;