import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert Strapi rich text format to plain text
export function richTextToPlainText(richText: any): string {
  if (typeof richText === 'string') {
    return richText
  }
  
  if (Array.isArray(richText)) {
    return richText.map(block => richTextToPlainText(block)).join('\n')
  }
  
  if (richText && typeof richText === 'object') {
    if (richText.type === 'text' && richText.text) {
      return richText.text
    }
    
    if (richText.children && Array.isArray(richText.children)) {
      return richText.children.map((child: any) => richTextToPlainText(child)).join('')
    }
  }
  
  return ''
}

// Convert plain text to Strapi rich text format
export function plainTextToRichText(text: string): any[] {
  if (!text || typeof text !== 'string') {
    return []
  }
  
  // Split text into paragraphs (double newlines)
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim())
  
  if (paragraphs.length === 0) {
    // Single paragraph
    return [{
      type: "paragraph",
      children: [{
        type: "text",
        text: text.trim()
      }]
    }]
  }
  
  return paragraphs.map(paragraph => ({
    type: "paragraph",
    children: [{
      type: "text",
      text: paragraph.trim()
    }]
  }))
}
