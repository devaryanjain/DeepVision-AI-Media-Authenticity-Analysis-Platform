const steps = [
  "Upload Image",
  "Extract Metadata",
  "AI Deepfake Detection",
  "Generate SHA-256 Hash",
  "Create PDF Report",
  "Store in MongoDB",
];

function Workflow() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <h2 className="text-4xl font-bold text-center mb-14">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {steps.map((step, index) => (

          <div
            key={step}
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-8
            text-center
            hover:border-cyan-500
            transition
            "
          >

            <div
              className="
              w-12
              h-12
              rounded-full
              bg-cyan-500
              flex
              items-center
              justify-center
              mx-auto
              mb-5
              font-bold
              "
            >
              {index + 1}
            </div>

            <h3 className="text-xl font-semibold">
              {step}
            </h3>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Workflow;