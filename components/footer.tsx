import Link from "next/link"
import { Mail, MapPin, Phone, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-current" />
              Candebrilla
            </h3>
            <p className="text-sm text-white/90 mb-4 italic font-medium">
              Crafted with supportive hand
            </p>
            <p className="text-sm text-white/80">
              Beautiful Candebrilla jewelry, crafted with love and care for every precious moment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white transition">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=Earrings" className="text-white/80 hover:text-white transition">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/products?category=Rings" className="text-white/80 hover:text-white transition">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/products?category=Neckpiece" className="text-white/80 hover:text-white transition">
                  Neckpieces
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@Candebrilla.com" className="text-white/80 hover:text-white transition">
                  info@Candebrilla.com
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+919876543210" className="text-white/80 hover:text-white transition">
                  +91 98765 43210
                </a>
              </li>

              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-white/80">India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80 text-sm">
          <p>&copy; 2025 Candebrilla. All rights reserved. Made with love.</p>
        </div>
      </div>
    </footer>
  )
}
