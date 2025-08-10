// components/common/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-green-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between">
        {/* About */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-white text-lg font-semibold mb-3">MyShop</h3>
          <p className="text-gray-400 text-sm">
            Your trusted source for quality products and excellent service.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul>
            <li>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Media (placeholders) */}
        <div className="md:w-1/3">
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">📘</a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">🐦</a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">📸</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">🔗</a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}
