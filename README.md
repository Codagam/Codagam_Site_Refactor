# Codagam - SaaS & Software Development Website

A modern, professional website built with Next.js, React, and Tailwind CSS featuring a clean 2-color design scheme.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📚 Documentation

For complete documentation on recreating this website design, see:

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Quick step-by-step guide (30 minutes)
- **[DESIGN_DOCUMENTATION.md](./DESIGN_DOCUMENTATION.md)** - Comprehensive design documentation
- **[RESPONSIVE_DESIGN.md](./RESPONSIVE_DESIGN.md)** - Complete responsive design guide
- **[RESPONSIVE_SUMMARY.md](./RESPONSIVE_SUMMARY.md)** - Quick responsive design summary

## 🎨 Design Overview

### Color Scheme

- **Primary**: Blue (`blue-900`) - Used for headings, buttons, and accents
- **Backgrounds**: White and Light Gray (`slate-50`) - Alternating sections
- **No black colors** - All dark elements use blue-900 instead

### Key Features

- ✅ Responsive design (mobile-first)
- ✅ Smooth scrolling navigation
- ✅ shadcn/ui components
- ✅ Dialog-based contact forms
- ✅ Product carousel
- ✅ Scroll-to-top button
- ✅ Email functionality with nodemailer

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Products.tsx
│   ├── TechStack.tsx
│   ├── CareerSection.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── shared/           # Shared components
└── lib/                  # Utilities and content
```

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Forms**: react-hook-form + zod
- **Icons**: lucide-react
- **Email**: nodemailer

## 📦 Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your email configuration

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create `.env.local`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📝 Key Design Rules

1. **Colors**: Use blue-900, NOT black
2. **Backgrounds**: Alternate white and slate-50
3. **Images**: No color overlays (transparent backgrounds)
4. **Forms**: All forms open in dialogs
5. **Buttons**: Blue-900 background, white text

## 📖 Need to Recreate This Design?

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for a quick 30-minute guide or [DESIGN_DOCUMENTATION.md](./DESIGN_DOCUMENTATION.md) for comprehensive documentation.

## 🚀 Deployment

Deploy to Vercel:

```bash
npm run build
```

The site is optimized for production and ready to deploy.

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Next.js and React
