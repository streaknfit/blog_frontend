// Strapi Content Type Definitions
// Place these in your Strapi project's api folder

// api/author/content-types/author/schema.json
const authorSchema = {
  kind: "collectionType",
  collectionName: "authors",
  info: {
    singularName: "author",
    pluralName: "authors",
    displayName: "Author",
    description: "Blog authors and contributors",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {},
  attributes: {
    name: {
      type: "string",
      required: true,
      maxLength: 255,
    },
    avatar: {
      type: "media",
      multiple: false,
      required: false,
      allowedTypes: ["images"],
    },
    bio: {
      type: "text",
      maxLength: 500,
    },
    blog_posts: {
      type: "relation",
      relation: "oneToMany",
      target: "api::blog-post.blog-post",
      mappedBy: "author",
    },
  },
}

// api/tag/content-types/tag/schema.json
const tagSchema = {
  kind: "collectionType",
  collectionName: "tags",
  info: {
    singularName: "tag",
    pluralName: "tags",
    displayName: "Tag",
    description: "Blog post tags for categorization",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {},
  attributes: {
    name: {
      type: "string",
      required: true,
      unique: true,
      maxLength: 100,
    },
    slug: {
      type: "uid",
      targetField: "name",
      required: true,
    },
    blog_posts: {
      type: "relation",
      relation: "manyToMany",
      target: "api::blog-post.blog-post",
      mappedBy: "tags",
    },
  },
}

// api/blog-post/content-types/blog-post/schema.json
const blogPostSchema = {
  kind: "collectionType",
  collectionName: "blog_posts",
  info: {
    singularName: "blog-post",
    pluralName: "blog-posts",
    displayName: "Blog Post",
    description: "Blog articles and posts",
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {
    i18n: {
      localized: true,
    },
  },
  attributes: {
    title: {
      type: "string",
      required: true,
      maxLength: 500,
    },
    slug: {
      type: "uid",
      targetField: "title",
      required: true,
    },
    body: {
      type: "richtext",
      required: true,
    },
    summary: {
      type: "text",
      maxLength: 300,
    },
    cover_image: {
      type: "media",
      multiple: false,
      required: false,
      allowedTypes: ["images"],
    },
    author: {
      type: "relation",
      relation: "manyToOne",
      target: "api::author.author",
      inversedBy: "blog_posts",
    },
    tags: {
      type: "relation",
      relation: "manyToMany",
      target: "api::tag.tag",
      inversedBy: "blog_posts",
    },
    upvotes: {
      type: "integer",
      default: 0,
      min: 0,
    },
    downvotes: {
      type: "integer",
      default: 0,
      min: 0,
    },
    read_count: {
      type: "integer",
      default: 0,
      min: 0,
    },
    read_time: {
      type: "integer",
      default: 5,
      min: 1,
    },
    is_featured: {
      type: "boolean",
      default: false,
    },
  },
}

console.log("Strapi Content Type Schemas:")
console.log("Author Schema:", JSON.stringify(authorSchema, null, 2))
console.log("Tag Schema:", JSON.stringify(tagSchema, null, 2))
console.log("Blog Post Schema:", JSON.stringify(blogPostSchema, null, 2))
