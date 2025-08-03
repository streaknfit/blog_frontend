"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-p:text-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-secondary prose-blockquote:border-l-primary prose-blockquote:text-foreground/80">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom component overrides for better styling
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-foreground mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-foreground mt-6 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold text-foreground mt-5 mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-bold text-foreground mt-4 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-foreground leading-relaxed mb-4">{children}</p>
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground">{children}</em>
          ),
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="bg-secondary text-primary px-1 py-0.5 rounded text-sm">
                  {children}
                </code>
              )
            }
            return (
              <code className={className}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="bg-secondary p-4 rounded-lg overflow-x-auto my-4">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 my-4">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 my-4 text-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 my-4 text-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-foreground">{children}</li>
          ),
          img: ({ src, alt }) => {
            console.log('Rendering image:', { src, alt })
            
            // Handle relative URLs (local images)
            if (src?.startsWith('/')) {
              return (
                <Image 
                  src={src} 
                  alt={alt || 'Blog image'} 
                  width={800}
                  height={400}
                  className="max-w-full h-auto rounded-lg my-4 shadow-sm"
                  priority={false}
                />
              )
            }
            
            // Handle external URLs - removed onError handler to avoid SSR issues
            if (src?.startsWith('http')) {
              return (
                <img 
                  src={src} 
                  alt={alt || 'Blog image'} 
                  className="max-w-full h-auto rounded-lg my-4 shadow-sm"
                  loading="lazy"
                />
              )
            }
            
            // Fallback for invalid URLs
            return (
              <div className="bg-secondary rounded-lg my-4 p-4 text-center text-muted-foreground">
                Image not found: {src}
              </div>
            )
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-border rounded-lg">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2 text-left font-bold bg-secondary">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}