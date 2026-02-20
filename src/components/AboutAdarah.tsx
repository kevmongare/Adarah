import { motion } from "framer-motion";
import { Heart, Globe, Baby, ShieldCheck } from "lucide-react";

export default function AboutAdarah() {
  return (
    <section className="bg-gradient-to-b from-pink-50 via-white to-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why <span className="text-pink-600">Adarah</span> Exists
          </h2>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            A father’s realization. A continent’s challenge.
            A mission to ensure no parent walks the pregnancy journey uninformed.
          </p>
        </motion.div>

        {/* Story Card */}
        <div className="bg-white shadow-xl rounded-3xl p-10 md:p-14 mb-20 border border-pink-100">
          <p className="text-gray-700 leading-relaxed mb-6">
            As I prepared to welcome my first child, I discovered how overwhelming
            maternal information can be. Clear, trusted guidance was scattered.
            Contradictory advice was everywhere.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Across Kenya and Africa, thousands of women face preventable
            pregnancy complications due to delayed information or limited
            access to trusted care.
          </p>

          <blockquote className="border-l-4 border-pink-600 pl-6 italic text-gray-600">
            “No mother should lose her first pregnancy because she didn’t
            have access to the right information at the right time.”
          </blockquote>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <StatCard
            icon={<Globe className="text-pink-600" />}
            number="287,000+"
            text="Global maternal deaths occur annually — many preventable."
          />
          <StatCard
            icon={<Baby className="text-pink-600" />}
            number="70%"
            text="Of maternal deaths occur in Sub-Saharan Africa."
          />
          <StatCard
            icon={<ShieldCheck className="text-pink-600" />}
            number="Preventable"
            text="Most complications reduce with early awareness."
          />
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-3xl p-12 text-center shadow-2xl">
          <Heart className="mx-auto mb-6" size={36} />
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p className="max-w-3xl mx-auto leading-relaxed">
            To ensure no parent feels lost, anxious, or unsupported.
            Adarah delivers compassionate AI support for pregnancy and newborn care —
            accessible, private, and culturally relevant.
          </p>
        </div>

      </div>
    </section>
  );
}

function StatCard({
  icon,
  number,
  text,
}: {
  icon: React.ReactNode;
  number: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h4 className="text-2xl font-bold text-gray-900 mb-3">{number}</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
