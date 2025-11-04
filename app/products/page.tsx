"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Sparkles, ChevronDown } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase-client"

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

interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  image_url: string
  size?: string
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category") || "All Products"

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory])

  async function fetchProducts() {
    try {
      setLoading(true)
      const supabase = getSupabaseClient()
      let query = supabase.from("products").select("*")

      if (selectedCategory !== "All Products") {
        query = query.eq("category", selectedCategory)
      }

      const { data, error } = await query.order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-12 border-b-2 border-primary bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-primary">
            Candebrilla
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Explore our exquisite collection of handcrafted pieces
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <h3 className="font-serif text-2xl font-bold mb-6 text-foreground">
                  Categories
                </h3>

                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                        selectedCategory === category
                          ? "bg-primary text-white shadow-lg"
                          : "bg-card border border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">

              {/* Filters */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-bold text-primary">{products.length}</span> products
                </div>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-input border-2 border-primary rounded-lg px-4 py-2 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">Loading...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <Sparkles className="w-16 h-16 text-muted/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg font-semibold">No products found in this category.</p>
                  <p className="text-muted-foreground">Check back soon for new Candebrilla pieces!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <div className="bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer h-full border border-border hover:border-primary">
                        <div className="h-64 bg-secondary/10 flex items-center justify-center overflow-hidden relative">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Sparkles className="w-20 h-20 text-primary/30" />
                          )}

                          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                            {product.category}
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 text-lg">
                            {product.name}
                          </h3>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex justify-between items-center">
                            <span className="font-bold text-lg text-primary">
                              ₹{product.price}
                            </span>

                            {/* <span className="text-xs bg-accent text-white px-3 py-1 rounded-full font-medium">
                              {product.size || "One Size"}
                            </span> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
