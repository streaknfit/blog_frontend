import { BlogContent } from "@/components/blog-content"

export default function TestMarkdownPage() {
  const sampleMarkdown = `# Test Markdown Rendering

This is a test page to demonstrate the markdown rendering capabilities.

## Image Test

Let's test image rendering:

![Test Image](https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=Test+Image)

## Features Supported

### 1. Headers
You can use different levels of headers with \`#\`, \`##\`, \`###\`, etc.

### 2. Text Formatting
- **Bold text** using \`**bold**\`
- *Italic text* using \`*italic*\`
- ***Bold and italic*** using \`***bold and italic***\`

### 3. Links
Here's a [link to Google](https://google.com) that opens in a new tab.

### 4. Images

#### Basic Image
![Sample Image](https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=Sample+Image)

#### Image with Alt Text
![Fitness Workout](https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop)

#### Local Image (if available)
![Local Image](/placeholder.jpg)

#### Image in Paragraph
Here's an image inline: ![Small Image](https://via.placeholder.com/200x100/10B981/FFFFFF?text=Small)

#### Multiple Images
![Image 1](https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Image+1)
![Image 2](https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Image+2)

### 5. Lists

#### Unordered List
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

#### Ordered List
1. First item
2. Second item
3. Third item

### 6. Code Blocks

#### Inline Code
You can use \`inline code\` within text.

#### Code Blocks
\`\`\`javascript
function helloWorld() {
  console.log("Hello, World!");
  return "Hello from JavaScript!";
}

// Call the function
helloWorld();
\`\`\`

\`\`\`python
def hello_world():
    print("Hello, World!")
    return "Hello from Python!"

# Call the function
hello_world()
\`\`\`

### 7. Blockquotes
> This is a blockquote. It's great for highlighting important information or quotes.
> 
> You can have multiple lines in a blockquote.

### 8. Tables

| Feature | Support | Notes |
|---------|---------|-------|
| Headers | ✅ | All levels supported |
| Bold/Italic | ✅ | Full support |
| Links | ✅ | Opens in new tab |
| Images | ✅ | Responsive |
| Lists | ✅ | Nested support |
| Code | ✅ | Syntax highlighting |
| Tables | ✅ | Full table support |

### 9. Task Lists
- [x] Install markdown libraries
- [x] Update blog content component
- [x] Add syntax highlighting
- [ ] Test with real blog content
- [ ] Deploy to production

### 10. Strikethrough
~~This text is strikethrough~~ using \`~~text~~\`

---

This demonstrates that your markdown content will now render properly with full formatting support!`

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Markdown Rendering Test</h1>
        <BlogContent content={sampleMarkdown} />
      </div>
    </div>
  )
} 