interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-p:text-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-secondary prose-blockquote:border-l-primary prose-blockquote:text-foreground/80">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
