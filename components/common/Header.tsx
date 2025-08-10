import { useState, useEffect, useRef } from "react";
import useAuth from "@/hooks/userAuth";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import Image from "next/image";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { items = [] } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-green-300 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/assets/logo.png" alt="Logo" width={40} height={40} />
              <span className="font-bold text-lg text-gray-800">MyShop</span>
            </Link>
          </div>

          {/* Center - Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/shop" className="text-gray-700 hover:text-blue-600">Shop</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </nav>

          {/* Right side - Cart + Profile */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <svg
                className="w-6 h-6 text-gray-700 hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 6.72A1 1 0 007 21h10a1 1 0 001-.78L20 13M7 13l-4-8"
                />
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Profile / Auth */}
            {isAuthenticated ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={user?.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full border"
                  />
                  <span className="hidden sm:block font-medium">
                    {user?.username || user?.name || "User"}
                  </span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                    {/* Order Management */}
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    {/* Product Management */}
                    <Link
                      href="/add-product"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Add Products
                    </Link>
                    <Link
                      href="/catalogs"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Catalogs
                    </Link>

                    {/* Account Settings */}
                    <Link
                      href="/update-profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Update Profile
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link href="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/shop" className="block text-gray-700 hover:text-blue-600">Shop</Link>
            <Link href="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
            <Link href="/contact" className="block text-gray-700 hover:text-blue-600">Contact</Link>
          </div>
        )}
      </div>
    </header>
  );
}
