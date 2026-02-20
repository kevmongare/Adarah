import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-pink-900 to-black text-gray-400 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-white text-2xl font-bold mb-4">
            Adarah
          </h3>
          <p>
            AI-powered maternal support for pregnancy
            and newborn care in Africa.
          </p>
        </div>

        <FooterColumn title="Product" links={["Talk to Adarah", "How It Works", "Safety"]} />
        <FooterColumn title="Company" links={["About", "Contact", "Partners"]} />
        <FooterColumn title="Legal" links={["Privacy Policy", "Terms"]} />

      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
        <p className="flex items-center justify-center gap-2">
          Built with <Heart className="text-pink-600" size={16} /> in Kenya
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} Adarah Health. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h4 className="text-white font-semibold mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i} className="hover:text-pink-500 cursor-pointer transition">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
}
