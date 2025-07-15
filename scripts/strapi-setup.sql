-- Strapi Database Schema Setup
-- This script creates the basic structure for Strapi content types

-- Create Authors table
CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    avatar TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Tags table
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    body TEXT NOT NULL,
    summary TEXT,
    cover_image TEXT,
    author_id INTEGER REFERENCES authors(id),
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    read_count INTEGER DEFAULT 0,
    read_time INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Blog Post Tags junction table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS blog_post_tags (
    id SERIAL PRIMARY KEY,
    blog_post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(blog_post_id, tag_id)
);

-- Insert sample authors
INSERT INTO authors (name, avatar, bio) VALUES
('Sarah Chen', '/uploads/sarah_chen_avatar.jpg', 'Tech writer and software engineer passionate about web development'),
('Marcus Johnson', '/uploads/marcus_johnson_avatar.jpg', 'Product designer with 10+ years of experience in UX/UI'),
('Elena Rodriguez', '/uploads/elena_rodriguez_avatar.jpg', 'Data scientist and machine learning enthusiast'),
('David Kim', '/uploads/david_kim_avatar.jpg', 'Full-stack developer and open source contributor'),
('Priya Patel', '/uploads/priya_patel_avatar.jpg', 'DevOps engineer and cloud architecture specialist');

-- Insert sample tags
INSERT INTO tags (name, slug) VALUES
('JavaScript', 'javascript'),
('React', 'react'),
('Next.js', 'nextjs'),
('TypeScript', 'typescript'),
('Web Development', 'web-development'),
('UI/UX', 'ui-ux'),
('Machine Learning', 'machine-learning'),
('DevOps', 'devops'),
('Cloud Computing', 'cloud-computing'),
('Data Science', 'data-science');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
