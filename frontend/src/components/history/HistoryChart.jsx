import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function HistoryChart({ history = [] }) {
  const real = history.filter(
    (item) => item.prediction?.toUpperCase() === "REAL"
  ).length;

  const fake = history.filter(
    (item) => item.prediction?.toUpperCase() === "FAKE"
  ).length;

  const chartData = [
    {
      name: "REAL",
      value: real,
    },
    {
      name: "FAKE",
      value: fake,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

      <div className="mb-6">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">
          Analytics
        </p>

        <h2 className="text-2xl font-bold">
          Detection Distribution
        </h2>

        <p className="text-slate-500 text-sm mt-2">
          Overview of real and manipulated images detected by the system.
        </p>
      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={105}
              innerRadius={55}
              paddingAngle={3}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default HistoryChart;