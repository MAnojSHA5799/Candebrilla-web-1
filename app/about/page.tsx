import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Sparkles, Heart, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* About Header */}
      <section className="py-12 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
            About Our Craft
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover the story behind our Candebrilla jewelry pieces
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Journey</h2>

              <p className="text-muted-foreground mb-4">
                Candebrilla was born from a passion for artisanal craftsmanship and a commitment to
                supporting traditional art forms. Each piece is meticulously created by skilled artisans
                who have honed their craft over years of dedicated work.
              </p>

              <p className="text-muted-foreground mb-4">
                We believe jewelry should tell a story. Every bead, every wire, every detail is carefully
                selected and placed with intention. From vibrant beaded earrings to intricate temple pieces,
                each item carries the soul of the maker.
              </p>

              <p className="text-muted-foreground">
                Today, we continue to celebrate Indian craftsmanship and heritage styles while embracing
                contemporary designs. We support artisans and ensure that every purchase directly impacts
                the skilled hands that created your jewelry.
              </p>
            </div>

            <div className="h-96 rounded-2xl flex items-center justify-center overflow-hidden border">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-03%20at%201.51.43%20PM-tyahCdtJAT2hWxDccq2cwLJAGGBNKT.jpeg"
                alt="Candebrilla collection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Our Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Artisan Support",
                  description:
                    "We empower skilled artisans by providing fair compensation and global opportunities.",
                },
                {
                  icon: Sparkles,
                  title: "Unique Craftsmanship",
                  description:
                    "Each jewelry piece is one-of-a-kind, handcrafted with premium materials including beads, metals, and brass.",
                },
                {
                  icon: Zap,
                  title: "Heritage & Innovation",
                  description:
                    "We blend traditional Indian jewelry-making techniques with modern design sensibilities.",
                },
              ].map((value, i) => {
                const Icon = value.icon
                return (
                  <div
                    key={i}
                    className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition"
                  >
                    <div className="w-16 h-16 bg-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-16 md:py-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-12 h-12 mx-auto mb-6 text-primary" />
          <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Crafted with Supportive Hands
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every jewelry piece in our collection is crafted with care, dedication, and a supportive hand.
            We believe in the power of artisanal work to transform lives and create beauty that lasts generations.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
