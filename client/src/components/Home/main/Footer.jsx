import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2 text-[#d58a94]">9achech</h2>
          <p className="text-sm text-gray-300">
            Your one-stop shop for fashion and lifestyle. Discover
            quality, shop smart.
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} 9achech. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
