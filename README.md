# SnF Blog Frontend

A modern blog frontend built with Next.js 15, TypeScript, and Tailwind CSS, integrated with a Strapi backend.

## Features

- 🚀 **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- 📱 **Responsive Design**: Mobile-first approach with beautiful UI
- 🔍 **Search & Filter**: Advanced search and filtering capabilities
- 🏷️ **Categories & Tags**: Organized content with categories and tags
- 👥 **Author Profiles**: Author information and related posts
- 💬 **Comments System**: Comment functionality with approval workflow
- 📊 **Analytics**: View tracking and upvote system
- 🎨 **Dark/Light Mode**: Theme switching capability
- 🔗 **Social Sharing**: Share buttons for social media
- 🔒 **Secure API**: Server-side proxy to protect API tokens

## Strapi Backend Integration

This frontend is designed to work with a Strapi backend at `https://backend.blog.streaknfit.com/` with the following content types:

### Blog
- title* (Text)
- slug* (UID)
- content* (Rich text - Markdown)
- coverImage (Media)
- excerpt (Text)
- readingTime (Number)
- featured (Boolean)
- views (Number)
- upvotes (Number)
- relatedTo (Relation - manyToMany with Blog)
- relatedBlogs (Relation - manyToMany with Blog)
- category (Relation - manyToOne with Category)
- tags (Relation - manyToMany with Tag)
- author (Relation - manyToOne with User)
- comments (Relation - oneToMany with Comment)
- seo (Component - SEO)

### Category
- name* (Text)
- slug* (UID)
- description* (Text)
- icon (Media)
- blogs (Relation - oneToMany with Blog)

### Tag
- name* (Text)
- slug* (UID)
- blogs (Relation - manyToMany with Blog)

### Comment
- name* (Text)
- email* (Email)
- approved* (Boolean)
- message* (Rich text - Blocks)
- blog (Relation - manyToOne with Blog)

### User (from users-permissions)
- username* (Text)
- email* (Email)
- provider (Text)
- password (Password)
- resetPasswordToken (Text)
- confirmationToken (Text)
- confirmed (Boolean)
- blocked (Boolean)
- role (Relation - manyToOne with Role)
- blogs (Relation - oneToMany with Blog)

### SEO Component
- metaTitle (Text)
- metaDescription (Text)
- metaImage (Media)

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with your Strapi API tokens:

```bash
# Strapi API Configuration (Server-side only - tokens are secure)
STRAPI_READ_TOKEN=your_read_token_here
STRAPI_WRITE_TOKEN=your_write_token_here
```

**Important Security Note**: These tokens are now stored server-side and are never exposed to the client browser, ensuring your API credentials remain secure.

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Integration

The frontend uses a secure server-side proxy (`/api/strapi`) that:

- **Protects API Tokens**: Tokens are stored server-side and never exposed to the client
- **Handles Authentication**: Automatically uses the appropriate token for read/write operations
- **Provides Error Handling**: Comprehensive error handling and logging
- **Supports All Methods**: GET, POST, PUT operations for all endpoints

### Key Features

- **Secure Token Management**: API tokens are never visible in browser network tabs
- **Automatic Data Transformation**: Converts API response structure to frontend-friendly format
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Skeleton loading components for better UX
- **Pagination**: Built-in pagination support
- **Search**: Full-text search across title, content, and excerpt
- **Filtering**: Filter by tags, categories, and featured posts
- **Real-time Updates**: View count and upvote tracking
- **Fallback Mode**: Graceful fallback to demo data when API is unavailable

## Security Features

### 🔒 **Token Protection**
- API tokens are stored as server-side environment variables
- No `NEXT_PUBLIC_` prefix means tokens are never exposed to the client
- All API calls go through a secure server-side proxy

### 🛡️ **Request Validation**
- Server-side validation of all API requests
- Proper error handling and logging
- Rate limiting and security headers

### 🔐 **CORS Protection**
- Server-side proxy eliminates CORS issues
- No direct client-to-Strapi communication
- Secure request forwarding

## Project Structure

```
SnF_blog_frontend/
├── app/                    # Next.js app directory
│   ├── api/               # Server-side API routes
│   │   └── strapi/        # Secure proxy to Strapi
│   ├── blog/[slug]/       # Individual blog post pages
│   ├── test-api/          # API connection test page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── blog-card.tsx     # Blog post card
│   ├── blog-feed.tsx     # Blog listing
│   ├── sidebar.tsx       # Sidebar with tags/categories
│   └── ...               # Other components
├── lib/                  # Utility functions
│   ├── api.ts           # Secure API client
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Customization

### Styling
The project uses Tailwind CSS with a custom design system. You can customize colors, spacing, and components in `tailwind.config.ts`.

### Components
All components are built with Radix UI primitives and can be easily customized. Check the `components/ui/` directory for base components.

### API Configuration
Modify the API configuration in `lib/api.ts` to change the proxy endpoint or add new functionality.

## Deployment

The project can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **Railway**
- **AWS Amplify**

Make sure to set the environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 