import { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiCheckCircle,
  FiAlertTriangle,
  FiTarget,
} from "react-icons/fi";

import api from "../../services/api";

function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    real: 0,
    fake: 0,
    accuracy: 99,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const response = await api.get("/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error("Dashboard loading failed:", error);
    }
  }

  const cards = [
    {
      title: "Images Analysed",
      value: stats.total,
      icon: <FiBarChart2 />,
      description: "Total analyses performed",
    },
    {
      title: "Real Images",
      value: stats.real,
      icon: <FiCheckCircle />,
      description: "Authentic media detected",
    },
    {
      title: "Fake Images",
      value: stats.fake,
      icon: <FiAlertTriangle />,
      description: "Manipulated media detected",
    },
    {
      title: "Model Accuracy",
      value: `${stats.accuracy}%`,
      icon: <FiTarget />,
      description: "AI detection accuracy",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center mb-12">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Live Analytics
        </p>

        <h2 className="text-4xl font-bold">
          Dashboard Overview
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="
              group
              relative
              overflow-hidden
              bg-slate-900/80
              border
              border-slate-800
              rounded-2xl
              p-7
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-cyan-500/60
              hover:shadow-lg
              hover:shadow-cyan-500/10
            "
          >
            <div className="flex items-center justify-between mb-6">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-cyan-500/10
                text-cyan-400
                flex
                items-center
                justify-center
                text-xl
              ">
                {card.icon}
              </div>

              <span className="text-xs text-slate-500">
                LIVE
              </span>

            </div>

            <p className="text-slate-400 text-sm mb-2">
              {card.title}
            </p>

            <h3 className="text-4xl font-bold text-cyan-400 mb-3">
              {card.value}
            </h3>

            <p className="text-xs text-slate-500">
              {card.description}
            </p>

            <div className="
              absolute
              -right-10
              -bottom-10
              w-28
              h-28
              rounded-full
              bg-cyan-500/5
              group-hover:bg-cyan-500/10
              transition
            " />

          </div>
        ))}

      </div>

    </section>
  );
}

export default DashboardStats;