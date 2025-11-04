# Candebrilla  E-Commerce Platform

A beautiful, fully-functional e-commerce website for selling Candebrilla jewelry with an admin dashboard for product management.

## Features

### For Customers
- Browse Candebrilla jewelry by 15 different categories
- Beautiful product showcase with high-quality images
- Detailed product information and pricing
- Responsive design for mobile, tablet, and desktop
- "Crafted with supportive hand" brand messaging

### For Admins
- Secure login system
- Add new products with images
- Edit existing products
- Delete products
- Manage inventory and pricing
- Dashboard with product statistics

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel Blob storage

### Installation

\`\`\`bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Set up environment variables
# Copy .env.example to .env.local and fill in your values
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
BLOB_READ_WRITE_TOKEN=your_blob_token
\`\`\`

### Database Setup

1. Go to your Supabase dashboard
2. Run the SQL script from `scripts/01-create-schema.sql`
3. Verify all tables are created

### Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Testing

Refer to `SETUP_AND_TESTING_GUIDE.md` for comprehensive testing instructions.

## Deployment

Deploy easily to Vercel:

\`\`\`bash
npm run build
vercel deploy
\`\`\`

## Admin Access

- URL: `/admin/login`
- Email: `admin@Candebrilla.com`
- Password: `Admin@123`

## Customization

- **Change Colors**: Edit `app/globals.css` to modify the primary, secondary, and accent colors
- **Add Categories**: Update the `CATEGORIES` array in `components/navbar.tsx`
- **Change Brand Name**: Search and replace "Candebrilla " with your brand name
- **Modify Tagline**: Update "Crafted with supportive hand" in `components/footer.tsx`

## License

This project is open source and available under the MIT License.

---

**Created with ❤️ for Candebrilla jewelry artisans**
