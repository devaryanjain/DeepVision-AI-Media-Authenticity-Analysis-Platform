import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import FeatureSection from "../components/home/FeatureSection";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <Hero />

      <Stats />

      <FeatureSection />

      <Footer />

    </div>
  );
}

export default Home;