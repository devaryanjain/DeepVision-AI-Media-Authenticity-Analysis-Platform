function ImagePreview({ image }) {

  if (!image) return null;

  return (

    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Image Preview
      </h2>

      <img
        src={URL.createObjectURL(image)}
        alt="preview"
        className="
        w-full
        max-h-[450px]
        object-contain
        rounded-2xl
        border
        border-slate-700
        "
      />

    </div>

  );

}

export default ImagePreview;