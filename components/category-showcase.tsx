"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

// ✅ Category Type
interface CategoryGroup {
  name: string
  image: string
  count: number
}

// ✅ Product Type (API response)
interface ProductItem {
  id?: number
  category: string
  image_url?: string
}

export function CategoryShowcase() {
  const [categories, setCategories] = useState<CategoryGroup[]>([])

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/products")
        const products: ProductItem[] = await res.json()

        const grouped: Record<string, CategoryGroup> = {}

        products.forEach((item) => {
          if (!grouped[item.category]) {
            grouped[item.category] = {
              name: item.category,
              image: item.image_url || "",
              count: 1,
            }
          } else {
            grouped[item.category].count++
          }
        })

        setCategories(Object.values(grouped))
      } catch (err) {
        console.error("Error loading categories", err)
      }
    }

    loadCategories()
  }, [])

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse collection of handcrafted jewelry
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
            >
              <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer group h-72 border border-border">

                <img
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2 text-center drop-shadow">
                    {cat.name}
                  </h3>
                  <p className="text-white/90 text-sm font-medium">
                    {cat.count} items
                  </p>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  )
}
