import { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

import ImagePreview from "./ImagePreview";
import AnalyzeButton from "./AnalyzeButton";

function UploadBox() {
  const inputRef = useRef();

  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  function validateFile(file) {
    if (!file) return false;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10 MB.");
      return false;
    }

    return true;
  }

  function selectFile(file) {
    if (!validateFile(file)) return;

    setImage(file);
    toast.success("Image selected successfully!");
  }

  function handleSelect(event) {
    selectFile(event.target.files[0]);
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];

    selectFile(file);
  }

  return (
    <>
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2
          border-dashed
          rounded-3xl
          p-16
          text-center
          cursor-pointer
          transition-all
          duration-300
          ${
            isDragging
              ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"
              : "border-cyan-500 bg-slate-900 hover:bg-slate-800"
          }
        `}
      >
        <UploadCloud
          size={72}
          className={`mx-auto mb-6 transition ${
            isDragging ? "text-cyan-300 scale-110" : "text-cyan-400"
          }`}
        />

        <h2 className="text-3xl font-bold mb-4">
          {isDragging
            ? "Drop Your Image Here"
            : "Drag & Drop Your Image"}
        </h2>

        <p className="text-slate-400 mb-8">
          {isDragging
            ? "Release to select the image"
            : "or click to browse files"}
        </p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current.click();
          }}
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
          JPG, JPEG, PNG • Maximum 10 MB
        </p>
      </div>

      <ImagePreview image={image} />

      <AnalyzeButton image={image} />
    </>
  );
}

export default UploadBox;