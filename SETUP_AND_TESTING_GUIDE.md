# Candebrilla  E-Commerce Platform - Setup and Testing Guide

## Overview
Complete Candebrilla jewelry e-commerce website with admin dashboard, product management, and beautiful UI with red, yellow, and blue color scheme.

## Features Implemented

### Frontend Features
- ✅ Responsive Navbar with category dropdown (15 jewelry categories)
- ✅ Hero banner with "Candebrilla " branding
- ✅ Category showcase with beautiful product images
- ✅ Products listing page with category filtering
- ✅ Individual product detail pages with full information
- ✅ About page with "Crafted with supportive hand" tagline
- ✅ Attractive footer with brand story and contact info
- ✅ Color scheme: Red (#d32f2f), Yellow (#ffc107), Blue (#1976d2)

### Admin Features
- ✅ Secure admin login (Demo: admin@Candebrilla.com / Admin@123)
- ✅ Admin dashboard with product management
- ✅ Add new products with category selection
- ✅ Edit products functionality
- ✅ Delete products functionality
- ✅ Image upload to Vercel Blob storage
- ✅ Stock management and pricing

### Database Features
- ✅ Products table with category field
- ✅ Users table for admin authentication
- ✅ Orders and order items tables
- ✅ Row Level Security (RLS) policies
- ✅ Public read access to products

### Categories Included
1. All Products
2. Earrings
3. Metal & Brass
4. Quirky (Beaded)
5. Indian (Beaded)
6. Mini Kids 
7. Temple & Antique 
8. Rings
9. Cuffs & Bracelets
10. Neckpiece
11. Heritage 
12. Combos & Hampers
13. Hair Accessories
14. Gifting
15. Brooch & Bag Charms
16. Belt

## Step-by-Step Testing Guide

### Step 1: Database Setup
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `/scripts/01-create-schema.sql`
4. Execute the SQL script to create all tables and policies

**Expected Result**: All tables created with proper RLS policies

### Step 2: Test Admin Login
1. Navigate to `/admin/login`
2. Enter credentials:
   - Email: `admin@Candebrilla.com`
   - Password: `Admin@123`
3. Click "Login"

**Expected Result**: Should redirect to `/admin/dashboard`

### Step 3: Create First Product
1. From admin dashboard, click "Add  Item"
2. Fill in the form:
   - Name: "Beaded Earrings"
   - Description: "Beautiful Candebrilla beaded earrings with vibrant colors"
   - Category: "Earrings"
   - Price: "499"
   - Stock: "10"
   - Size: "One Size"
   - Image: Upload one of your jewelry images

3. Click "Create Product"

**Expected Result**: Product added and appears in admin dashboard table

### Step 4: Verify Product on Frontend
1. Navigate to `/products`
2. You should see your newly created product in the grid
3. Click on it to view the product detail page

**Expected Result**: Product details display correctly with image, price (₹499), category badge, and description

### Step 5: Test Category Filtering
1. Go to `/products`
2. Click on a category from the sidebar (e.g., "Earrings")
3. The product list should filter to show only products from that category

**Expected Result**: Only products in the selected category are displayed

### Step 6: Test Image Upload
1. From admin dashboard, add another product
2. Upload an image (ensure file is less than 5MB)
3. Click "Create Product"
4. Verify the image appears on the product detail page

**Expected Result**: Image successfully uploaded to Vercel Blob and displays on product page

### Step 7: Test Edit Product
1. From admin dashboard, click "Edit" on any product
2. Modify some details (e.g., change price)
3. Save changes
4. Verify the changes appear on the product page

**Expected Result**: Product details updated successfully

### Step 8: Test Delete Product
1. From admin dashboard, click "Delete" on a product
2. Confirm the deletion
3. Verify the product is removed from the list and frontend

**Expected Result**: Product deleted from database and no longer visible

### Step 9: Test Navigation
1. Click "Home" in navbar - should go to homepage
2. Click category names in navbar dropdown - should filter products
3. Click "About" - should show about page with "Crafted with supportive hand" tagline
4. Click "Admin" - should go to login page

**Expected Result**: All navigation works correctly

### Step 10: Test Responsive Design
1. Open the website on mobile device or use browser DevTools
2. Test navbar - should show hamburger menu on mobile
3. Test product grid - should show 1 column on mobile, 2 on tablet, 3-4 on desktop
4. Test footer - should stack properly on mobile

**Expected Result**: Site is responsive and looks good on all device sizes

## Deployment Instructions

### Deploy to Vercel
1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `BLOB_READ_WRITE_TOKEN`

6. Click "Deploy"

### Set Custom Domain (Optional)
1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Troubleshooting

### Issue: Products not showing on frontend
- Verify database schema is created correctly
- Check if products table has data in Supabase
- Ensure Supabase client is initialized correctly

### Issue: Image upload fails
- Check if file is less than 5MB
- Verify Vercel Blob integration is connected
- Check browser console for error messages

### Issue: Admin login fails
- Verify credentials: admin@Candebrilla.com / Admin@123
- Check browser localStorage for token storage
- Clear cache and try again

### Issue: Category filter not working
- Verify category names match exactly (case-sensitive)
- Check if products have category field populated
- Refresh the page and try again

## File Structure
\`\`\`
├── app/
│   ├── admin/
│   │   ├── login/page.tsx          # Admin login page
│   │   ├── dashboard/page.tsx      # Admin dashboard
│   │   ├── add-product/page.tsx    # Add product form
│   │   └── edit-product/[id]/page.tsx # Edit product form
│   ├── products/
│   │   ├── page.tsx                # Products listing page
│   │   └── [id]/page.tsx           # Product detail page
│   ├── about/page.tsx              # About page
│   ├── page.tsx                    # Homepage
│   ├── api/
│   │   ├── auth/login/route.ts     # Login API
│   │   └── upload/route.ts         # Image upload API
│   ├── globals.css                 # Global styles with color scheme
│   └── layout.tsx                  # Root layout
├── components/
│   ├── navbar.tsx                  # Navigation with categories
│   ├── footer.tsx                  # Footer with tagline
│   ├── category-showcase.tsx       # Category cards component
│   ├── ui/                         # shadcn UI components
│   └── ...
├── lib/
│   ├── supabase-client.ts          # Supabase client
│   ├── supabase-server.ts          # Server-side Supabase
│   └── utils.ts                    # Utility functions
└── scripts/
    └── 01-create-schema.sql        # Database schema
\`\`\`

## Key Technologies Used
- **Framework**: Next.js 16 with App Router
- **Database**: Supabase (PostgreSQL)
- **Storage**: Vercel Blob
- **Styling**: Tailwind CSS v4 with custom color scheme
- **UI Components**: shadcn/ui
- **Authentication**: Demo credentials with JWT tokens
- **API**: Next.js Route Handlers

## Admin Credentials
- Email: `admin@Candebrilla.com`
- Password: `Admin@123`

## Color Scheme
- **Primary (Red)**: #d32f2f
- **Secondary (Yellow)**: #ffc107
- **Accent (Blue)**: #1976d2
- **Background**: #fef8f0
- **Foreground**: #1a1a1a

## Support
For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Website Ready to Deploy! 🚀**
