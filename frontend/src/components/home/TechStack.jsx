import {
  FaReact,
  FaPython,
  FaDatabase,
  FaGithub,
} from "react-icons/fa";

import {
  SiFastapi,
  SiMongodb,
  SiPytorch,
} from "react-icons/si";

const tech = [
  {
    name: "React",
    icon: <FaReact size={40} className="text-cyan-400" />,
  },
  {
    name: "FastAPI",
    icon: <SiFastapi size={40} className="text-green-400" />,
  },
  {
    name: "MongoDB",
    icon: <SiMongodb size={40} className="text-green-500" />,
  },
  {
    name: "PyTorch",
    icon: <SiPytorch size={40} className="text-red-500" />,
  },
  {
    name: "Python",
    icon: <FaPython size={40} className="text-yellow-400" />,
  },
  {
    name: "GitHub",
    icon: <FaGithub size={40} className="text-white" />,
  },
];

function TechStack() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <h2 className="text-4xl font-bold text-center mb-14">
        Technology Stack
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

        {tech.map((item) => (

          <div
            key={item.name}
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-8
            flex
            flex-col
            items-center
            hover:border-cyan-500
            hover:-translate-y-2
            transition-all
            "
          >

            {item.icon}

            <p className="mt-4 font-semibold">
              {item.name}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default TechStack;