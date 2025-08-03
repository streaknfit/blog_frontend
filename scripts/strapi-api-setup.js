// Strapi API Configuration and Custom Routes
// This script shows how to set up custom API endpoints for the blog

// Custom API routes for blog functionality
const customRoutes = {
  // api/blog-post/routes/custom-blog-post.js
  blogPostRoutes: {
    routes: [
      {
        method: "GET",
        path: "/blog-posts/trending",
        handler: "blog-post.findTrending",
        config: {
          policies: [],
        },
      },
      {
        method: "GET",
        path: "/blog-posts/featured",
        handler: "blog-post.findFeatured",
        config: {
          policies: [],
        },
      },
      {
        method: "POST",
        path: "/blog-posts/:id/vote",
        handler: "blog-post.vote",
        config: {
          policies: [],
        },
      },
      {
        method: "POST",
        path: "/blog-posts/:id/increment-read-count",
        handler: "blog-post.incrementReadCount",
        config: {
          policies: [],
        },
      },
    ],
  },
}

// Custom controller methods
const customControllers = {
  // api/blog-post/controllers/blog-post.js
  blogPostController: `
    'use strict';

    const { createCoreController } = require('@strapi/strapi').factories;

    module.exports = createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
      // Find trending blog posts
      async findTrending(ctx) {
        try {
          const entity = await strapi.db.query('api::blog-post.blog-post').findMany({
            where: { publishedAt: { $notNull: true } },
            populate: ['author', 'tags', 'cover_image'],
            orderBy: [
              { upvotes: 'desc' },
              { read_count: 'desc' },
              { publishedAt: 'desc' }
            ],
            limit: 10
          });

          return this.transformResponse(entity);
        } catch (err) {
          return ctx.badRequest('Error fetching trending posts', { error: err.message });
        }
      },

      // Find featured blog posts
      async findFeatured(ctx) {
        try {
          const entity = await strapi.db.query('api::blog-post.blog-post').findMany({
            where: { 
              publishedAt: { $notNull: true },
              is_featured: true 
            },
            populate: ['author', 'tags', 'cover_image'],
            orderBy: { publishedAt: 'desc' },
            limit: 5
          });

          return this.transformResponse(entity);
        } catch (err) {
          return ctx.badRequest('Error fetching featured posts', { error: err.message });
        }
      },

      // Vote on a blog post
      async vote(ctx) {
        try {
          const { id } = ctx.params;
          const { type } = ctx.request.body; // 'up' or 'down'

          if (!['up', 'down'].includes(type)) {
            return ctx.badRequest('Invalid vote type. Must be "up" or "down".');
          }

          const blogPost = await strapi.db.query('api::blog-post.blog-post').findOne({
            where: { id }
          });

          if (!blogPost) {
            return ctx.notFound('Blog post not found');
          }

          const updateData = {};
          if (type === 'up') {
            updateData.upvotes = blogPost.upvotes + 1;
          } else {
            updateData.downvotes = blogPost.downvotes + 1;
          }

          const updatedPost = await strapi.db.query('api::blog-post.blog-post').update({
            where: { id },
            data: updateData,
            populate: ['author', 'tags']
          });

          return this.transformResponse(updatedPost);
        } catch (err) {
          return ctx.badRequest('Error voting on post', { error: err.message });
        }
      },

      // Increment read count
      async incrementReadCount(ctx) {
        try {
          const { id } = ctx.params;

          const blogPost = await strapi.db.query('api::blog-post.blog-post').findOne({
            where: { id }
          });

          if (!blogPost) {
            return ctx.notFound('Blog post not found');
          }

          const updatedPost = await strapi.db.query('api::blog-post.blog-post').update({
            where: { id },
            data: { read_count: blogPost.read_count + 1 }
          });

          return { success: true, read_count: updatedPost.read_count };
        } catch (err) {
          return ctx.badRequest('Error incrementing read count', { error: err.message });
        }
      }
    }));
  `,
}

// Strapi configuration for CORS and API settings
const strapiConfig = {
  // config/middlewares.js
  middlewares: `
    module.exports = [
      'strapi::errors',
      {
        name: 'strapi::security',
        config: {
          contentSecurityPolicy: {
            useDefaults: true,
            directives: {
              'connect-src': ["'self'", 'https:'],
              'img-src': ["'self'", 'data:', 'blob:', 'https:'],
              'media-src': ["'self'", 'data:', 'blob:', 'https:'],
              upgradeInsecureRequests: null,
            },
          },
        },
      },
      {
        name: 'strapi::cors',
        config: {
          enabled: true,
          headers: '*',
          origin: ['http://localhost:3000', 'https://backend.blog.streaknfit.com']
        }
      },
      'strapi::poweredBy',
      'strapi::logger',
      'strapi::query',
      'strapi::body',
      'strapi::session',
      'strapi::favicon',
      'strapi::public',
    ];
  `,

  // config/api.js
  apiConfig: `
    module.exports = {
      rest: {
        defaultLimit: 25,
        maxLimit: 100,
        withCount: true,
      },
    };
  `,
}

console.log("Strapi Setup Configuration:")
console.log("Custom Routes:", JSON.stringify(customRoutes, null, 2))
console.log("Custom Controllers:", customControllers.blogPostController)
console.log("Strapi Config:", strapiConfig)
