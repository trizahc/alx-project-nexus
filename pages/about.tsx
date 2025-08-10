// pages/about.tsx
import React from "react";

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">About Us</h1>

      <section className="mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">MyShop</span>, your number one source for all things amazing.
          We're dedicated to providing you the very best of products, with an emphasis on quality, customer service, and uniqueness.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to deliver high-quality products that bring value and joy to our customers.
          We strive to innovate and improve continuously to meet and exceed your expectations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Founded in 2024, MyShop started as a small project with a big vision. Over time, thanks to our loyal customers and dedicated team, we've grown into a trusted brand in ecommerce.
          We cherish every opportunity to serve you and look forward to many more years of success together.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">How to Use This Website</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
          <li><strong>Sign Up / Log In:</strong> Create an account or log in to access personalized features like order history and saved items.</li>
          <li><strong>Browse Products:</strong> Visit the Shop page to explore our wide range of products. Use filters and search to find exactly what you want.</li>
          <li><strong>Add to Cart:</strong> Select products and add them to your cart. You can review your cart anytime before checkout.</li>
          <li><strong>Place Order:</strong> Go to the Cart page and proceed to checkout. Fill in your shipping and payment details to complete the purchase.</li>
          <li><strong>Track Orders:</strong> After ordering, check your profile for order status and history.</li>
          <li><strong>Contact Us:</strong> If you need help or have questions, use the Contact page or email us at <a href="mailto:support@myshop.com" className="text-blue-600 underline">support@myshop.com</a>.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:support@myshop.com" className="text-blue-600 underline">support@myshop.com</a>.
        </p>
      </section>
    </main>
  );
}
