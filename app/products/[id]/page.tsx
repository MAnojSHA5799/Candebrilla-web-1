"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Sparkles, ShoppingCart, ArrowLeft } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase-client"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  image_url: string
  size: string
  stock_quantity: number
}

export default function ProductDetail() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [productId])

  async function fetchProduct() {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading product...</p>
            </div>
          ) : !product ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Product not found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Image */}
              <div className="h-96 md:h-full min-h-96 bg-gradient-to-b from-secondary/10 to-primary/10 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-primary/20">
                {product.image_url ? (
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Sparkles className="w-32 h-32 text-primary/30" />
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <p className="text-sm font-semibold uppercase tracking-wide mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    {product.category} Collection
                  </p>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
                </div>

                <p className="text-muted-foreground text-lg mb-6">{product.description}</p>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-2">Product Details</p>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-2">Size</p>
                  <p className="text-muted-foreground">{product.size || "One Size Fits All"}</p>
                </div>

                <div className="mb-8">
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    ₹{product.price}
                  </p>
                </div>

                {product.stock_quantity > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border-2 border-primary rounded-lg">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2 hover:bg-primary hover:text-white transition font-bold"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 border-l border-r border-primary font-semibold">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2 hover:bg-primary hover:text-white transition font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-muted-foreground text-sm font-medium">
                        ({product.stock_quantity} in stock)
                      </span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg text-white gap-2 py-6 text-lg">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </Button>
                  </div>
                ) : (
                  <Button disabled className="w-full py-6 text-lg">
                    Out of Stock
                  </Button>
                )}

                <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-foreground font-semibold mb-2">✓ Candebrilla with Care</p>
                  <p className="text-sm text-muted-foreground">✓ Crafted with supportive hand</p>
                  <p className="text-sm text-muted-foreground">✓ Premium quality materials</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
