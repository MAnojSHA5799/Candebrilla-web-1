"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Plus, Edit2, Trash2, ImageIcon, Sparkles } from "lucide-react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase-client"

interface Product {
  id: string
  name: string
  price: number
  category: string
  size: string
  stock_quantity: number
  image_url: string | null
}

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }
    setIsAuthenticated(true)
    fetchProducts()
  }, [router])

  async function fetchProducts() {
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteProduct(id: string) {
    if (!window.confirm("Are you sure you want to delete this  item?")) return

    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) throw error
      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Updated for jewelry brand styling */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent border-b-2 border-primary sticky top-0 z-40 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <div>
              <h1 className="font-serif text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-white/80">Manage Candebrilla  Store</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2 bg-white text-primary hover:bg-white/90 border-0"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add Product Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-3xl font-bold"> Products</h2>
            <Link href="/admin/add-product">
              <Button className="bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg text-white gap-2">
                <Plus className="w-4 h-4" />
                Add  Item
              </Button>
            </Link>
          </div>

          {/* Products Table */}
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-card rounded-lg border-2 border-primary/20 p-12 text-center">
              <Sparkles className="w-12 h-12 text-muted/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4 text-lg">No  items yet. Create your first product!</p>
              <Link href="/admin/add-product">
                <Button className="bg-gradient-to-r from-primary via-secondary to-accent text-white">
                  Create  Item
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-card rounded-lg border-2 border-primary/20 overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b-2 border-primary">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-muted/50 transition">
                        <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                          ₹{product.price}
                        </td>
                        <td className="px-6 py-4 text-sm">{product.stock_quantity}</td>
                        <td className="px-6 py-4 text-sm">
                          {product.image_url ? (
                            <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                              <ImageIcon className="w-4 h-4" />
                              Uploaded
                            </span>
                          ) : (
                            <span className="text-muted-foreground">No image</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/edit-product/${product.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1 bg-transparent border-primary text-primary hover:bg-primary hover:text-white"
                              >
                                <Edit2 className="w-3 h-3" />
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteProduct(product.id)}
                              className="gap-1 text-destructive hover:text-destructive border-destructive hover:bg-destructive hover:text-white"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card rounded-lg border-2 border-primary/20 p-6">
              <p className="text-muted-foreground text-sm font-semibold mb-2">Total Products</p>
              <p className="text-3xl font-bold text-primary">{products.length}</p>
            </div>
            <div className="bg-card rounded-lg border-2 border-secondary/20 p-6">
              <p className="text-muted-foreground text-sm font-semibold mb-2">Total Stock</p>
              <p className="text-3xl font-bold text-secondary">
                {products.reduce((sum, p) => sum + p.stock_quantity, 0)}
              </p>
            </div>
            <div className="bg-card rounded-lg border-2 border-accent/20 p-6">
              <p className="text-muted-foreground text-sm font-semibold mb-2">Total Value</p>
              <p className="text-3xl font-bold text-accent">
                ₹{products.reduce((sum, p) => sum + p.price * p.stock_quantity, 0).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
