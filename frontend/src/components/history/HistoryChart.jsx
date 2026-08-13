import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function HistoryChart({ data }) {
  const real = data.filter((item) => item.prediction === "REAL").length;
  const fake = data.filter((item) => item.prediction === "FAKE").length;

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
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 mb-10">

      <h2 className="text-2xl font-bold mb-6">
        Detection Distribution
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={120}
              label
            >

              {chartData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default HistoryChart;