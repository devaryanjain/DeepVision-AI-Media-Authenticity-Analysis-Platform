import { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

import ImagePreview from "./ImagePreview";
import AnalyzeButton from "./AnalyzeButton";

function UploadBox() {
  const inputRef = useRef();

  const [image, setImage] = useState(null);

  function handleSelect(e) {
    const file = e.target.files[0];

    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    // Validate size (10 MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10 MB.");
      return;
    }

    setImage(file);
    toast.success("Image selected successfully!");
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
          p-16
          text-center
          bg-slate-900
          hover:bg-slate-800
          transition-all
          duration-300
          cursor-pointer
          hover:scale-[1.01]
        "
      >
        <UploadCloud
          size={72}
          className="mx-auto text-cyan-400 mb-6"
        />

        <h2 className="text-3xl font-bold mb-4">
          Drag & Drop Your Image
        </h2>

        <p className="text-slate-400 mb-8">
          Click anywhere to browse your files
        </p>

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-2
            px-8
            py-3
            rounded-xl
            bg-cyan-500
            hover:bg-cyan-600
            font-semibold
            transition
          "
        >
          <ImageIcon size={20} />
          Browse Image
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg"
          hidden
          onChange={handleSelect}
        />

        <p className="mt-8 text-sm text-slate-500">
          Supported formats: JPG, JPEG, PNG (Max 10 MB)
        </p>
      </div>

      <ImagePreview image={image} />

      <AnalyzeButton image={image} />
    </>
  );
}

export default UploadBox;