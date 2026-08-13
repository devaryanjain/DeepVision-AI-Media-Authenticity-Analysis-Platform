import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import UploadBox from "../components/upload/UploadBox";

function Upload() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-20 flex-1">

        <h1 className="text-5xl font-bold text-center mb-4">
          Upload Image
        </h1>

        <p className="text-center text-slate-400 mb-12">
          Upload an image to perform AI-powered deepfake detection.
        </p>

        <UploadBox />

      </main>

      <Footer />

    </div>
  );
}

export default Upload;