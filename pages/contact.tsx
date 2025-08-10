import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill all fields");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1500)); // simulate API
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Contact Form */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-red-700 text-center">{error}</p>}
          {success && <p className="text-green-700 text-center">{success}</p>}

          <div>
            <label htmlFor="name" className="block mb-2 font-semibold text-blue-900">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full rounded-md border border-blue-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-blue-900">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-md border border-blue-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-semibold text-blue-900">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Write your message here"
              className="w-full rounded-md border border-blue-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Shop Contact Details */}
      <div className="bg-gradient-to-br from-green-100 to-green-300 rounded-lg p-6 shadow-lg flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-green-900 text-center">Shop Contact Details</h2>
        <ul className="space-y-4 text-green-900 text-lg">
          <li>
            <strong>Address:</strong> 123 Commerce Street, Nairobi, Kenya
          </li>
          <li>
            <strong>Phone:</strong> +254 712 345 678
          </li>
          <li>
            <strong>Email:</strong> support@myshop.com
          </li>
          <li>
            <strong>Working Hours:</strong> Mon - Fri, 9am - 6pm
          </li>
        </ul>
      </div>
    </div>
  );
}
