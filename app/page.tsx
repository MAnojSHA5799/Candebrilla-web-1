"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategoryShowcase } from "@/components/category-showcase"
import { ArrowRight, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative py-20 md:py-13 overflow-hidden bg-muted/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4 w-fit">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <span className="text-sm font-semibold text-primary">
                  Handcrafted with Love
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
                Adorn Yourself with{" "}
                <span className="text-primary">
                  Candebrilla
                </span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Discover our exquisite collection of handcrafted pieces. 
                Each piece is uniquely designed and crafted with supportive hand, 
                combining traditional craftsmanship with contemporary style.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link href="/products">
                  <Button className="bg-primary hover:shadow-lg text-white gap-2 text-base px-8">
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-base px-8 bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 md:h-full min-h-96">
              <div className="absolute inset-0 bg-secondary/20 rounded-3xl" />
              <div className="relative w-full h-full bg-muted/50 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-primary/20">
                <img
                  src="https://u1p32uqdgpxafzvi.public.blob.vercel-storage.com/candebrilla/1762238371482-WhatsApp%20Image%202025-11-04%20at%2011.53.22%20AM%20%2811%29.jpeg"
                  alt="Candebrilla"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Featured Products */}
      {/* Featured Products  */}
<section className="py-14 md:py-14 bg-card">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-primary">
        Artisan Collections
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        Explore our handpicked selection of premium pieces, 
        each crafted with care and attention to detail.
      </p>
    </div>

    {/* ✅ PRODUCTS FROM DATABASE */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {[
        {
          id: "2455",
          name: "Hand-Made Earrings",
          price: "350.00",
          image_url:
            "https://u1p32uqdgpxafzvi.public.blob.vercel-storage.com/candebrilla/1762238220143-WhatsApp%20Image%202025-11-04%20at%2011.53.22%20AM%20%2814%29.jpeg",
        },
        {
          id: "48c0",
          name: "Hand-Made Earrings",
          price: "450.00",
          image_url:
            "https://u1p32uqdgpxafzvi.public.blob.vercel-storage.com/candebrilla/1762238271719-WhatsApp%20Image%202025-11-04%20at%2011.53.22%20AM%20%2813%29.jpeg",
        },
        {
          id: "56859",
          name: "Hand-Made Earrings",
          price: "350.00",
          image_url:
            "https://u1p32uqdgpxafzvi.public.blob.vercel-storage.com/candebrilla/1762238422200-WhatsApp%20Image%202025-11-04%20at%2011.53.22%20AM%20%2810%29.jpeg",
        },
        {
          id: "9b4d",
          name: "Hand-Made Earrings",
          price: "450.00",
          image_url:
            "https://u1p32uqdgpxafzvi.public.blob.vercel-storage.com/candebrilla/1762238315755-WhatsApp%20Image%202025-11-04%20at%2011.53.22%20AM%20%2812%29.jpeg",
        },
        {
          id: "aed45",
          name: "Hand-Made Earrings",
          price: "450.00",
          image_url:
            "https://u1p32uqdgpxafzvi.public.blob.vercel-storage.com/candebrilla/1762238501708-WhatsApp%20Image%202025-11-04%20at%2011.53.22%20AM%20%281%29.jpeg",
        },
        {
          id: "edce",
          name: "Hand-Made Earrings",
          price: "150.00",
          image_url:
            "https://u1p32uqdgpxafzvi.public.blob.vercel-storage.com/candebrilla/1762238460114-WhatsApp%20Image%202025-11-04%20at%2011.53.22%20AM%20%288%29.jpeg",
        },
      ].map((item) => (
        <div
          key={item.id}
          className="bg-background rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border border-border hover:border-primary"
        >
          {/* ✅ IMAGE */}
          <div className="h-64 bg-secondary/10 flex items-center justify-center overflow-hidden">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ✅ TEXT */}
          <div className="p-6">
            <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">
              {item.name}
            </h3>

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-primary">
                ₹{item.price}
              </span>

              <Link href="/products">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                >
                  Explore
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      <Link href="/products">
        <Button size="lg" className="bg-primary hover:shadow-lg text-white">
          View All Products
        </Button>
      </Link>
    </div>
  </div>
</section>


      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
            Why Choose Candebrilla
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Artisan Crafted",
                desc: "Each piece is hand-crafted by skilled artisans with years of experience.",
              },
              {
                title: "Unique Designs",
                desc: "Every piece is one-of-a-kind, ensuring you own something truly special.",
              },
              {
                title: "Premium Quality",
                desc: "We use only the finest materials including beads, metals, and brass.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary transition"
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  ⭐
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Ready to Express Your Style?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Browse our complete collection and find your perfect piece today.
          </p>
          <Link href="/products">
            <Button className="bg-white text-primary hover:bg-white/90 gap-2 text-base px-8">
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
