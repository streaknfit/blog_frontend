import type { Author, Tag, BlogPost } from "./types"

export const mockAuthors: Author[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Tech writer and software engineer passionate about web development",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Product designer with 10+ years of experience in UX/UI",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Data scientist and machine learning enthusiast",
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Full-stack developer and open source contributor",
  },
  {
    id: "5",
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "DevOps engineer and cloud architecture specialist",
  },
]

export const mockTags: Tag[] = [
  { id: "1", name: "JavaScript", slug: "javascript" },
  { id: "2", name: "React", slug: "react" },
  { id: "3", name: "Next.js", slug: "nextjs" },
  { id: "4", name: "TypeScript", slug: "typescript" },
  { id: "5", name: "Web Development", slug: "web-development" },
  { id: "6", name: "UI/UX", slug: "ui-ux" },
  { id: "7", name: "Machine Learning", slug: "machine-learning" },
  { id: "8", name: "DevOps", slug: "devops" },
  { id: "9", name: "Cloud Computing", slug: "cloud-computing" },
  { id: "10", name: "Data Science", slug: "data-science" },
]

export const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Applications with Next.js 14",
    slug: "building-modern-web-applications-nextjs-14",
    body: `
      <h2>Introduction to Next.js 14</h2>
      <p>Next.js 14 brings exciting new features that revolutionize how we build web applications. With improved performance, better developer experience, and enhanced capabilities, it's the perfect time to dive into modern web development.</p>
      
      <h3>Key Features</h3>
      <p>The latest version introduces several groundbreaking features:</p>
      <ul>
        <li><strong>App Router Stability:</strong> The App Router is now stable and production-ready</li>
        <li><strong>Server Actions:</strong> Simplified server-side logic with better type safety</li>
        <li><strong>Improved Performance:</strong> Faster builds and optimized runtime performance</li>
        <li><strong>Enhanced Developer Experience:</strong> Better error messages and debugging tools</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>Setting up a new Next.js 14 project is straightforward. You can use the create-next-app command to bootstrap your application with all the latest features configured out of the box.</p>
      
      <blockquote>
        <p>"Next.js 14 represents a significant leap forward in web development, offering developers the tools they need to build fast, scalable applications." - Vercel Team</p>
      </blockquote>
      
      <h3>Performance Optimizations</h3>
      <p>One of the most impressive aspects of Next.js 14 is its focus on performance. The framework now includes automatic optimizations that work behind the scenes to ensure your applications load quickly and provide an excellent user experience.</p>
      
      <p>Whether you're building a simple blog or a complex e-commerce platform, Next.js 14 provides the foundation you need to create exceptional web experiences.</p>
    `,
    summary:
      "Explore the latest features and improvements in Next.js 14, including App Router stability, Server Actions, and performance enhancements that make modern web development more efficient.",
    coverImage: "/placeholder.svg?height=400&width=800",
    tags: [mockTags[2], mockTags[0], mockTags[4]],
    author: mockAuthors[0],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    upvotes: 124,
    downvotes: 3,
    readCount: 1250,
    readTime: 8,
    isFeatured: true,
  },
  {
    id: "2",
    title: "The Art of Minimalist UI Design: Less is More",
    slug: "art-of-minimalist-ui-design",
    body: `
      <h2>Understanding Minimalist Design</h2>
      <p>Minimalist UI design is more than just removing elements from your interface. It's about creating purposeful, clean, and functional designs that prioritize user experience above all else.</p>
      
      <h3>Core Principles</h3>
      <p>Successful minimalist design follows several key principles:</p>
      <ul>
        <li><strong>Clarity:</strong> Every element should have a clear purpose</li>
        <li><strong>Simplicity:</strong> Remove unnecessary complexity</li>
        <li><strong>Functionality:</strong> Form follows function</li>
        <li><strong>White Space:</strong> Use negative space effectively</li>
      </ul>
      
      <h3>Benefits of Minimalist Design</h3>
      <p>When done correctly, minimalist design offers numerous advantages:</p>
      <ul>
        <li>Improved user focus and reduced cognitive load</li>
        <li>Faster loading times and better performance</li>
        <li>Enhanced accessibility and usability</li>
        <li>Timeless aesthetic that doesn't quickly become outdated</li>
      </ul>
      
      <h3>Common Mistakes to Avoid</h3>
      <p>While minimalism can be powerful, it's easy to go too far. Avoid these common pitfalls:</p>
      <ul>
        <li>Removing essential functionality for the sake of simplicity</li>
        <li>Using minimalism as an excuse for lack of creativity</li>
        <li>Ignoring user needs in favor of aesthetic preferences</li>
      </ul>
      
      <p>Remember, the goal is to create interfaces that are both beautiful and functional, not just visually sparse.</p>
    `,
    summary:
      "Discover the principles and benefits of minimalist UI design, and learn how to create clean, functional interfaces that prioritize user experience.",
    coverImage: "/placeholder.svg?height=400&width=800",
    tags: [mockTags[5], mockTags[4]],
    author: mockAuthors[1],
    createdAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    upvotes: 89,
    downvotes: 2,
    readCount: 890,
    readTime: 6,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Machine Learning in 2024: Trends and Predictions",
    slug: "machine-learning-2024-trends-predictions",
    body: `
      <h2>The Current State of Machine Learning</h2>
      <p>As we progress through 2024, machine learning continues to evolve at an unprecedented pace. From large language models to computer vision breakthroughs, the field is experiencing remarkable growth and innovation.</p>
      
      <h3>Key Trends Shaping 2024</h3>
      <p>Several major trends are defining the machine learning landscape this year:</p>
      
      <h4>1. Multimodal AI Systems</h4>
      <p>The integration of text, image, audio, and video processing in single models is becoming increasingly sophisticated. These systems can understand and generate content across multiple modalities, opening new possibilities for human-computer interaction.</p>
      
      <h4>2. Edge AI and Mobile Deployment</h4>
      <p>Running complex ML models directly on devices is becoming more practical, reducing latency and improving privacy. This trend is particularly important for real-time applications and scenarios with limited connectivity.</p>
      
      <h4>3. Sustainable AI Development</h4>
      <p>There's growing awareness of the environmental impact of training large models. Researchers are focusing on developing more efficient algorithms and training techniques that require less computational power.</p>
      
      <h3>Predictions for the Rest of 2024</h3>
      <p>Based on current developments, we can expect to see:</p>
      <ul>
        <li>More accessible AI tools for non-technical users</li>
        <li>Improved model interpretability and explainability</li>
        <li>Better integration of AI in everyday applications</li>
        <li>Continued focus on ethical AI development</li>
      </ul>
      
      <p>The future of machine learning looks incredibly promising, with potential applications spanning healthcare, education, climate science, and beyond.</p>
    `,
    summary:
      "An in-depth look at the current trends in machine learning for 2024, including multimodal AI, edge computing, and sustainable development practices.",
    coverImage: "/placeholder.svg?height=400&width=800",
    tags: [mockTags[6], mockTags[9]],
    author: mockAuthors[2],
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
    upvotes: 156,
    downvotes: 8,
    readCount: 1420,
    readTime: 10,
    isFeatured: true,
  },
  {
    id: "4",
    title: "TypeScript Best Practices for Large-Scale Applications",
    slug: "typescript-best-practices-large-scale-applications",
    body: `
      <h2>Why TypeScript for Large Applications?</h2>
      <p>TypeScript has become the go-to choice for large-scale JavaScript applications, providing type safety, better tooling, and improved maintainability. However, using TypeScript effectively in large codebases requires following specific best practices.</p>
      
      <h3>Project Structure and Organization</h3>
      <p>A well-organized project structure is crucial for large TypeScript applications:</p>
      <ul>
        <li>Use barrel exports to simplify imports</li>
        <li>Organize code by feature rather than by file type</li>
        <li>Implement consistent naming conventions</li>
        <li>Separate types into dedicated files when they become complex</li>
      </ul>
      
      <h3>Type Safety Best Practices</h3>
      <p>Maximize the benefits of TypeScript's type system:</p>
      <ul>
        <li>Enable strict mode in your tsconfig.json</li>
        <li>Use union types instead of any when possible</li>
        <li>Leverage utility types for code reuse</li>
        <li>Implement proper error handling with typed exceptions</li>
      </ul>
      
      <h3>Performance Considerations</h3>
      <p>Large TypeScript projects can face compilation performance issues. Here's how to address them:</p>
      <ul>
        <li>Use project references for monorepos</li>
        <li>Implement incremental compilation</li>
        <li>Optimize your tsconfig.json settings</li>
        <li>Consider using SWC or esbuild for faster builds</li>
      </ul>
      
      <h3>Team Collaboration</h3>
      <p>Ensure your team can work effectively with TypeScript:</p>
      <ul>
        <li>Establish coding standards and use ESLint</li>
        <li>Document complex types and interfaces</li>
        <li>Use automated testing with type checking</li>
        <li>Implement proper code review processes</li>
      </ul>
      
      <p>By following these practices, you can harness the full power of TypeScript while maintaining code quality and developer productivity in large-scale applications.</p>
    `,
    summary:
      "Learn essential TypeScript best practices for building and maintaining large-scale applications, covering project structure, type safety, performance, and team collaboration.",
    coverImage: "/placeholder.svg?height=400&width=800",
    tags: [mockTags[3], mockTags[0], mockTags[4]],
    author: mockAuthors[3],
    createdAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-08T16:45:00Z",
    upvotes: 98,
    downvotes: 4,
    readCount: 1100,
    readTime: 12,
    isFeatured: false,
  },
  {
    id: "5",
    title: "DevOps in the Cloud: A Complete Guide to Modern Infrastructure",
    slug: "devops-cloud-modern-infrastructure-guide",
    body: `
      <h2>The Evolution of DevOps</h2>
      <p>DevOps has transformed from a cultural movement to a comprehensive set of practices and tools that enable organizations to deliver software faster and more reliably. In the cloud era, these practices have become even more powerful and accessible.</p>
      
      <h3>Core DevOps Principles</h3>
      <p>Understanding the fundamental principles is essential for successful DevOps implementation:</p>
      <ul>
        <li><strong>Collaboration:</strong> Breaking down silos between development and operations</li>
        <li><strong>Automation:</strong> Reducing manual processes and human error</li>
        <li><strong>Continuous Integration/Continuous Deployment:</strong> Streamlining the software delivery pipeline</li>
        <li><strong>Monitoring and Feedback:</strong> Gaining insights into system performance and user experience</li>
      </ul>
      
      <h3>Cloud-Native DevOps Tools</h3>
      <p>The cloud has introduced powerful new tools and services that make DevOps more accessible:</p>
      
      <h4>Infrastructure as Code (IaC)</h4>
      <p>Tools like Terraform, AWS CloudFormation, and Azure Resource Manager allow you to define and manage infrastructure using code, making it version-controlled, repeatable, and scalable.</p>
      
      <h4>Container Orchestration</h4>
      <p>Kubernetes has become the standard for container orchestration, providing automated deployment, scaling, and management of containerized applications.</p>
      
      <h4>CI/CD Pipelines</h4>
      <p>Cloud-based CI/CD services like GitHub Actions, GitLab CI, and Azure DevOps provide powerful automation capabilities without the need to manage infrastructure.</p>
      
      <h3>Best Practices for Cloud DevOps</h3>
      <p>Implementing DevOps in the cloud requires following proven best practices:</p>
      <ul>
        <li>Start with a clear strategy and goals</li>
        <li>Implement security from the beginning (DevSecOps)</li>
        <li>Use monitoring and observability tools</li>
        <li>Practice disaster recovery and backup strategies</li>
        <li>Continuously optimize costs and performance</li>
      </ul>
      
      <p>The future of DevOps lies in further automation, AI-assisted operations, and even tighter integration between development and operations teams.</p>
    `,
    summary:
      "A comprehensive guide to implementing DevOps practices in cloud environments, covering tools, best practices, and strategies for modern infrastructure management.",
    coverImage: "/placeholder.svg?height=400&width=800",
    tags: [mockTags[7], mockTags[8]],
    author: mockAuthors[4],
    createdAt: "2024-01-05T11:20:00Z",
    updatedAt: "2024-01-05T11:20:00Z",
    upvotes: 142,
    downvotes: 6,
    readCount: 1380,
    readTime: 15,
    isFeatured: true,
  },
  {
    id: "6",
    title: "React Performance Optimization: Advanced Techniques",
    slug: "react-performance-optimization-advanced-techniques",
    body: `
      <h2>Understanding React Performance</h2>
      <p>React applications can become slow as they grow in complexity. Understanding how React works under the hood and applying the right optimization techniques can dramatically improve your application's performance.</p>
      
      <h3>Identifying Performance Bottlenecks</h3>
      <p>Before optimizing, you need to identify where the problems are:</p>
      <ul>
        <li>Use React DevTools Profiler to identify slow components</li>
        <li>Monitor bundle size and loading times</li>
        <li>Analyze runtime performance with browser dev tools</li>
        <li>Track user experience metrics</li>
      </ul>
      
      <h3>Advanced Optimization Techniques</h3>
      
      <h4>1. Memoization Strategies</h4>
      <p>Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders. However, be careful not to over-optimize, as memoization has its own costs.</p>
      
      <h4>2. Code Splitting and Lazy Loading</h4>
      <p>Implement dynamic imports and React.lazy to split your bundle and load components only when needed. This reduces initial bundle size and improves loading times.</p>
      
      <h4>3. Virtual Scrolling</h4>
      <p>For large lists, implement virtual scrolling to render only visible items. Libraries like react-window can help with this.</p>
      
      <h4>4. State Management Optimization</h4>
      <p>Optimize your state structure and consider using state management libraries like Zustand or Redux Toolkit for complex applications.</p>
      
      <h3>Modern React Features for Performance</h3>
      <p>React 18 introduced several features that can improve performance:</p>
      <ul>
        <li><strong>Concurrent Features:</strong> Enable better user experience with time slicing</li>
        <li><strong>Suspense:</strong> Improve loading states and data fetching</li>
        <li><strong>Server Components:</strong> Reduce client-side JavaScript bundle size</li>
      </ul>
      
      <h3>Measuring Success</h3>
      <p>Always measure the impact of your optimizations:</p>
      <ul>
        <li>Use Lighthouse for performance audits</li>
        <li>Monitor Core Web Vitals</li>
        <li>Track real user metrics</li>
        <li>Set up performance budgets</li>
      </ul>
      
      <p>Remember, premature optimization is the root of all evil. Focus on user experience and measure the impact of your changes.</p>
    `,
    summary:
      "Master advanced React performance optimization techniques including memoization, code splitting, virtual scrolling, and leveraging React 18 features for better user experience.",
    tags: [mockTags[1], mockTags[0], mockTags[4]],
    author: mockAuthors[0],
    createdAt: "2024-01-03T13:10:00Z",
    updatedAt: "2024-01-03T13:10:00Z",
    upvotes: 76,
    downvotes: 2,
    readCount: 920,
    readTime: 9,
    isFeatured: false,
  },
]
