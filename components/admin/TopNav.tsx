// components/TopNav.tsx
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side: Logo */}
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-gray-800">MyShop</span>
        </div>

        {/* Right side: Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/">
            <a className="text-gray-700 hover:text-gray-900">Home</a>
          </Link>
          <Link href="/shop">
            <a className="text-gray-700 hover:text-gray-900">Shop</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-700 hover:text-gray-900">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-gray-700 hover:text-gray-900">Contact</a>
          </Link>
          <Link href="/login">
            <a className="text-gray-700 hover:text-gray-900">Login</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
