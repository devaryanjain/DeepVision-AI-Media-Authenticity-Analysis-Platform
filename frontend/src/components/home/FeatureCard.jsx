import Card from "../common/Card";

function FeatureCard({ icon, title, description }) {
  return (
    <Card>

      <div className="text-cyan-400 mb-6">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-slate-300 leading-8">
        {description}
      </p>

    </Card>
  );
}

export default FeatureCard;