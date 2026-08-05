import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

import ImagePreview from "./ImagePreview";
import AnalyzeButton from "./AnalyzeButton";

function UploadBox() {

  const inputRef = useRef();

  const [image, setImage] = useState(null);

  function handleSelect(e) {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

  }

  return (
    <>

      <div
        onClick={() => inputRef.current.click()}
        className="
        border-2
        border-dashed
        border-cyan-500
        rounded-3xl
        p-20
        text-center
        bg-slate-900
        hover:bg-slate-800
        transition
        cursor-pointer
        "
      >

        <UploadCloud
          size={70}
          className="mx-auto text-cyan-400 mb-6"
        />

        <h2 className="text-3xl font-bold mb-3">
          Drag & Drop Image
        </h2>

        <p className="text-slate-400 mb-6">
          or click to browse files
        </p>

        <button
          className="
          px-8
          py-3
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-600
          font-semibold
          "
        >
          Browse Image
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleSelect}
        />

      </div>

      <ImagePreview image={image} />

      <AnalyzeButton image={image} />

    </>
  );

}

export default UploadBox;