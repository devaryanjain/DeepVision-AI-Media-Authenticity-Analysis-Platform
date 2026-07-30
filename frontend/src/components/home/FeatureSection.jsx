import { motion } from "framer-motion";
import {
  ScanSearch,
  ShieldCheck,
  FileText,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

function FeatureSection() {

  const features = [
    {
      icon: <ScanSearch size={38} />,
      title: "AI Detection",
      description:
        "Detect manipulated images using the EfficientNet-B0 deep learning model.",
    },

    {
      icon: <ShieldCheck size={38} />,
      title: "Metadata Analysis",
      description:
        "Inspect EXIF metadata and image properties for forensic investigation.",
    },

    {
      icon: <FileText size={38} />,
      title: "PDF Reports",
      description:
        "Generate professional forensic PDF reports with one click.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-bold text-center mb-16"
      >
        Why Choose
        <span className="text-cyan-400"> DeepVision AI</span>?
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">

        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}

      </div>

    </section>
  );
}

export default FeatureSection;