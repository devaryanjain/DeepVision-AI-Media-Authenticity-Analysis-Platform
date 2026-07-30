import Card from "../common/Card";

function Stats() {
  const stats = [
    { value: "99%", label: "Detection Accuracy" },
    { value: "3+", label: "AI Modules" },
    { value: "24/7", label: "Instant Reports" },
    { value: "100%", label: "Local Processing" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="text-center">

              <h2 className="text-5xl font-bold text-cyan-400 mb-4">
                {stat.value}
              </h2>

              <p className="text-slate-400">
                {stat.label}
              </p>

            </div>
          </Card>
        ))}

      </div>

    </section>
  );
}

export default Stats;