# API Integration Guide

This document explains how the frontend integrates with your Strapi backend API using a secure server-side proxy.

## 🔒 Security Architecture

The frontend uses a secure server-side proxy (`/api/strapi`) that:

- **Protects API Tokens**: Tokens are stored server-side and never exposed to the client
- **Handles Authentication**: Automatically uses the appropriate token for read/write operations
- **Eliminates CORS Issues**: No direct client-to-Strapi communication
- **Provides Error Handling**: Comprehensive error handling and logging

## API Response Format

Based on the actual API responses, your Strapi backend returns data in the following format:

### Blog Response
```json
{
  "data": [
    {
      "id": 4,
      "documentId": "bm6rhbp12cd663i5fyd918og",
      "title": "How to Prevent Exercise‑Induced Hair Loss",
      "slug": "how-to-prevent-exercise-induced-hair-loss",
      "createdAt": "2025-07-16T17:37:07.134Z",
      "updatedAt": "2025-07-16T17:37:07.134Z",
      "publishedAt": "2025-07-16T17:37:09.869Z",
      "excerpt": "Regular workouts are great for your body...",
      "readingTime": 8,
      "featured": true,
      "views": 0,
      "upvotes": 0,
      "content": "### Introduction\nPhysical activity is essential...",
      "coverImage": {
        "id": 2,
        "documentId": "zxegqxxjazl0r04dzt7bqr0d",
        "name": "men_hair_scalp.png",
        "url": "/uploads/men_hair_scalp_8fbafc9f8c.png",
        "formats": {
          "large": { "url": "/uploads/large_men_hair_scalp_8fbafc9f8c.png", "width": 1000, "height": 1000 },
          "small": { "url": "/uploads/small_men_hair_scalp_8fbafc9f8c.png", "width": 500, "height": 500 },
          "medium": { "url": "/uploads/medium_men_hair_scalp_8fbafc9f8c.png", "width": 750, "height": 750 },
          "thumbnail": { "url": "/uploads/thumbnail_men_hair_scalp_8fbafc9f8c.png", "width": 156, "height": 156 }
        }
      },
      "relatedTo": [],
      "relatedBlogs": [],
      "category": null,
      "tags": [],
      "author": {
        "id": 1,
        "documentId": "ulm37crxx4fe6ep5ywfqb7at",
        "username": "ashish",
        "email": "ashish.daingwal@gmai.com",
        "provider": "local",
        "confirmed": false,
        "blocked": false,
        "createdAt": "2025-07-13T22:08:41.555Z",
        "updatedAt": "2025-07-13T22:08:41.555Z",
        "publishedAt": "2025-07-13T22:08:38.560Z"
      },
      "comments": [],
      "seo": {
        "id": 2,
        "metaTitle": "Prevent Hair Loss from Fitness Workouts",
        "metaDescription": "Discover why intense workouts can lead to hair thinning..."
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

### Categories Response
```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 0,
      "total": 0
    }
  }
}
```

### Tags Response
```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 0,
      "total": 0
    }
  }
}
```

## Key Differences from Standard Strapi

1. **No Nested Attributes**: Unlike standard Strapi, your API returns data directly without the `attributes` wrapper
2. **Document IDs**: Each entity has a `documentId` field
3. **Published At**: All entities include a `publishedAt` timestamp
4. **Direct Relationships**: Related data is returned directly, not wrapped in `data` objects

## Secure API Endpoints

### Client-Side Requests (Secure)
- `GET /api/strapi?endpoint=/blogs` - Get all blogs
- `GET /api/strapi?endpoint=/blogs&write=true` - Use write token
- `POST /api/strapi?endpoint=/comments` - Create comment
- `PUT /api/strapi?endpoint=/blogs/123` - Update blog

### Server-Side Proxy (Internal)
The proxy forwards requests to your Strapi backend:
- `GET https://backend.blog.streaknfit.com/api/blogs` - Get all blogs
- `GET https://backend.blog.streaknfit.com/api/categories?populate=*` - Get categories
- `GET https://backend.blog.streaknfit.com/api/tags?populate=*` - Get tags
- `POST https://backend.blog.streaknfit.com/api/comments` - Create comment

## Frontend Integration

The frontend uses a secure API client that communicates through the server-side proxy:

### Data Transformation
```typescript
const transformBlog = (blogData: any): BlogPost => {
  return {
    id: blogData.id,
    title: blogData.title || 'Untitled',
    slug: blogData.slug || `blog-${blogData.id}`,
    content: blogData.content || '',
    coverImage: blogData.coverImage?.url 
      ? getMediaUrl(blogData.coverImage.url)
      : undefined,
    excerpt: blogData.excerpt || '',
    readingTime: blogData.readingTime || 0,
    featured: blogData.featured || false,
    views: blogData.views || 0,
    upvotes: blogData.upvotes || 0,
    // ... other fields
  }
}
```

### Secure API Requests
```typescript
const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {},
  useWriteToken = false
): Promise<T> => {
  const url = new URL('/api/strapi', window.location.origin)
  url.searchParams.append('endpoint', endpoint)
  
  if (useWriteToken) {
    url.searchParams.append('write', 'true')
  }

  const response = await fetch(url.toString(), {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  
  return response.json()
}
```

### Media URL Handling
```typescript
const getMediaUrl = (url: string): string => {
  if (url.startsWith('http')) return url
  return `https://backend.blog.streaknfit.com${url}`
}
```

## Environment Variables

Create a `.env.local` file with your API tokens (server-side only):

```bash
# Strapi API Configuration (Server-side only - tokens are secure)
STRAPI_READ_TOKEN=your_read_token_here
STRAPI_WRITE_TOKEN=your_write_token_here
```

**Security Benefits:**
- No `NEXT_PUBLIC_` prefix means tokens are never exposed to the client
- Tokens are only accessible server-side
- Network tab will never show your API tokens

## Testing the Integration

1. **Visit the test page**: Go to `http://localhost:3000/test-api`
2. **Test different endpoints**: Use the buttons to test blogs, categories, and tags APIs
3. **Check console logs**: Open browser dev tools to see detailed API responses
4. **Verify security**: Check network tab - you'll see requests to `/api/strapi`, not direct Strapi calls
5. **Verify data display**: Check that blog posts, categories, and tags are displayed correctly

## Error Handling

The frontend includes comprehensive error handling:

1. **API Failures**: Falls back to demo data with warning messages
2. **Missing Data**: Provides default values for missing fields
3. **Network Issues**: Shows user-friendly error messages
4. **Debug Mode**: Console logging for troubleshooting
5. **Security Errors**: Proper handling of authentication failures

## Features Implemented

- ✅ **Secure Token Management**: API tokens never exposed to client
- ✅ **Blog Listing**: Display all blogs with pagination
- ✅ **Blog Details**: Individual blog post pages
- ✅ **Search**: Full-text search across title, content, and excerpt
- ✅ **Filtering**: Filter by featured, trending, latest
- ✅ **Categories**: Display and filter by categories
- ✅ **Tags**: Display and filter by tags
- ✅ **Comments**: Create and display comments
- ✅ **Author Information**: Display author details
- ✅ **SEO**: Meta title, description, and image support
- ✅ **Media**: Handle cover images with multiple formats
- ✅ **Voting**: Upvote system
- ✅ **View Tracking**: Automatic view count increment

## Security Features

### 🔒 **Token Protection**
- API tokens stored as server-side environment variables
- No client-side exposure of sensitive credentials
- Automatic token selection for read/write operations

### 🛡️ **Request Validation**
- Server-side validation of all API requests
- Proper error handling and logging
- Security headers and CORS protection

### 🔐 **Proxy Architecture**
- All requests go through secure server-side proxy
- No direct client-to-Strapi communication
- Eliminates CORS and token exposure issues

## Next Steps

1. **Add API Tokens**: Configure your environment variables (server-side only)
2. **Test Integration**: Use the test page to verify API connectivity
3. **Add Content**: Create blogs, categories, and tags in your Strapi admin
4. **Customize**: Modify the frontend styling and functionality as needed

## Troubleshooting

### Common Issues

1. **500 Server Error**: Check that environment variables are set correctly
2. **Empty Data**: No content has been created in Strapi yet
3. **Image Issues**: Media URLs might need CORS configuration
4. **Search Not Working**: Ensure the search filters are properly configured

### Debug Tools

- **Test Page**: `/test-api` for API testing
- **Console Logs**: Detailed API request/response logging
- **Network Tab**: Browser dev tools for HTTP requests (will show `/api/strapi` calls)
- **Fallback Mode**: Demo data when API is unavailable
- **Server Logs**: Check terminal for server-side proxy logs 