import { useState } from "react";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

export default function ContactAdarah() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section className="bg-gradient-to-b from-black via-pink-800 to-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100">
            Contact <span className="text-pink-600">Adarah</span>
          </h2>
          <p className="text-gray-100 mt-4">
            We're here to support you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-10 shadow-xl border border-pink-100"
          >
            <div className="space-y-6">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
              />

              <textarea
                name="message"
                placeholder="How can we help?"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition transform"
              >
                Send Message
              </button>

              {submitted && (
                <p className="text-pink-600 text-sm text-center mt-4">
                  💗 Message sent successfully!
                </p>
              )}

            </div>
          </form>

          {/* INFO */}
          <div className="space-y-8">
            <ContactCard icon={<Mail />} title="Email" detail="support@adarahhealth.com" />
            <ContactCard icon={<Phone />} title="Phone" detail="+254 700 000 000" />
            <ContactCard icon={<MapPin />} title="Location" detail="Nairobi, Kenya" />

            <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white p-8 rounded-3xl shadow-xl">
              <Heart className="mb-4" />
              <p>
                Adarah encourages hospital visits and does not replace medical care.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 flex items-start gap-4">
      <div className="text-pink-600">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600">{detail}</p>
      </div>
    </div>
  );
}
