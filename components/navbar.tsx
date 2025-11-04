"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const CATEGORIES = [
  "All Products",
  "Earrings",
  "Metal & Brass",
  "Quirky (Beaded)",
  "Indian (Beaded)",
  "Mini Kids ",
  "Temple & Antique ",
  "Rings",
  "Cuffs & Bracelets",
  "Neckpiece",
  "Heritage ",
  "Combos & Hampers",
  "Hair Accessories",
  "Gifting",
  "Brooch & Bag Charms",
  "Belt",
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b-2 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-serif text-xl font-bold">C</span>
            </div>

            <span className="font-serif text-2xl font-bold hidden sm:inline text-primary">
              Candebrilla
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-foreground hover:text-primary font-medium transition">
              Home
            </Link>

            <div className="relative group">
              <button className="text-foreground hover:text-primary font-medium transition flex items-center gap-1">
                Shop
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-primary-foreground first:rounded-t-lg last:rounded-b-lg transition"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/about" className="text-foreground hover:text-primary font-medium transition">
              About
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="hidden sm:inline">
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Admin
              </Button>
            </Link>
            <ShoppingCart className="w-5 h-5 text-primary cursor-pointer" />

            {/* Mobile Menu Toggle */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
            <Link href="/" className="block py-2 hover:text-primary font-medium">
              Home
            </Link>

            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="block w-full text-left py-2 hover:text-primary font-medium"
            >
              Shop
            </button>

            {categoryOpen && (
              <div className="pl-4 space-y-1">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block py-1 text-sm text-muted-foreground hover:text-primary"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/about" className="block py-2 hover:text-primary font-medium">
              About
            </Link>

            <Link href="/admin/login" className="block pt-2">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Admin
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
