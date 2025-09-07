import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleWhatsAppRedirect = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("⚠️ Please fill in all fields before sending.");
      return;
    }
    if (!validateEmail(email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    const encodedMessage = encodeURIComponent(
      `Hello Ghaith,\nMy name is ${name}.\nEmail: ${email}\nMessage: ${message}`
    );
    const whatsappURL = `https://wa.me/963934309818?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <section id="contact" className="py-16 px-4 md:px-12 text-white text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        🚀 Get in Touch – Let’s Connect
      </h2>

      <div className="max-w-xl mx-auto space-y-6">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 rounded bg-gray-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleWhatsAppRedirect}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white rounded-full 
                     bg-gradient-to-r from-green-500 via-green-600 to-green-700 
                     shadow-lg shadow-green-500/30 
                     transition-all duration-300 ease-out
                     hover:from-green-400 hover:via-green-500 hover:to-green-600
                     hover:shadow-green-400/50 hover:scale-105
                     active:scale-95 active:shadow-inner
                     focus:outline-none focus:ring-4 focus:ring-green-400/50
                     animate-pulse"
        >
          <FaWhatsapp className="text-xl transition-transform duration-300 group-hover:rotate-12" />
          <span className="tracking-wide">Send via WhatsApp</span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>
      </div>
    </section>
  );
}
