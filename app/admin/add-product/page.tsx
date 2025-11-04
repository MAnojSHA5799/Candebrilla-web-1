"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, AlertCircle } from "lucide-react"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase-client"

const CATEGORIES = [
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

export default function AddProductPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: CATEGORIES[0],
    size: "",
    stock_quantity: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB")
      return
    }

    setImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
  
    if (!formData.name || !formData.price) {
      setError("Name and price are required")
      return
    }
  
    setLoading(true)
  
    try {
      let imageUrl = null
  
      console.log("📌 Form data before upload:", formData)
      console.log("📌 Image file:", image)
  
      // Upload image if provided
      if (image) {
        const formDataUpload = new FormData()
        formDataUpload.append("file", image)
  
        console.log("⬆️ Uploading image...")
  
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
        })
  
        console.log("✅ Upload response:", uploadResponse)
  
        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json()
          console.log("❌ Upload failed:", uploadError)
          throw new Error(uploadError.message || "Failed to upload image")
        }
  
        const uploadData = await uploadResponse.json()
        console.log("✅ Upload Data:", uploadData)
  
        imageUrl = uploadData.url
      }
  
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        size: formData.size,
        stock_quantity: Number.parseInt(formData.stock_quantity) || 0,
        image_url: imageUrl,
      }
  
      console.log("📦 Final product data to insert:", productData)
  
      // Save product to database
      const supabase = getSupabaseClient()
      console.log("🔗 Inserting to Supabase...")
  
      const { data, error: dbError } = await supabase
        .from("products")
        .insert([productData])
        .select()
  
      console.log("✅ Supabase Insert Response:", data)
  
      if (dbError) {
        console.log("❌ Database Error:", dbError)
        throw dbError
      }
  
      router.push("/admin/dashboard")
    } catch (err) {
      console.log("❌ Catch error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-white hover:text-white/80 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-card rounded-lg border-2 border-primary/20 p-8">
          <h1 className="text-3xl font-bold mb-2">Add New  Item</h1>
          <p className="text-muted-foreground mb-8">Create a new Candebrilla  product for your store</p>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Beaded Earrings, Temple Necklace"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Describe your  piece..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input resize-none"
              />
            </div>

            {/* Category - Added category dropdown for jewelry types */}
            <div>
              <label className="block text-sm font-semibold mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="499.00"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Stock Quantity</label>
                <input
                  type="number"
                  name="stock_quantity"
                  placeholder="10"
                  value={formData.stock_quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
                />
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-semibold mb-2">Size / Dimensions</label>
              <input
                type="text"
                name="size"
                placeholder="e.g., One Size, Free Size, Small/Medium/Large"
                value={formData.size}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-input"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2">Product Image</label>
              <div className="border-2 border-dashed border-primary rounded-lg p-6">
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-xs max-h-48 mb-4 rounded-lg border border-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null)
                        setImagePreview("")
                      }}
                      className="text-sm text-destructive hover:text-destructive/80 underline font-semibold"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium mb-1">Click or drag image here</p>
                    <p className="text-xs text-muted-foreground mb-4">PNG, JPG up to 5MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-sm text-primary hover:text-primary/80 underline font-semibold"
                    >
                      Choose file
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <Link href="/admin/dashboard" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg text-white"
              >
                {loading ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
