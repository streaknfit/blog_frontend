"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { blogApi, categoryApi, tagApi } from "@/lib/api"

export default function TestApiPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [testType, setTestType] = useState<string>("")

  const testBlogsApi = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    setTestType("Blogs API (Client)")

    try {
      const response = await blogApi.getAll({ pageSize: 5, populate: '*' })
      setResult(response)
      console.log('Blogs API Response:', response)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Blogs API Test Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const testCategoriesApi = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    setTestType("Categories API (Client)")

    try {
      const response = await categoryApi.getAll()
      setResult(response)
      console.log('Categories API Response:', response)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Categories API Test Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const testTagsApi = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    setTestType("Tags API (Client)")

    try {
      const response = await tagApi.getAll()
      setResult(response)
      console.log('Tags API Response:', response)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Tags API Test Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const testRawApi = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    setTestType("Raw API (Direct)")

    try {
      const baseUrl = process.env.BACKEND_URL
      const url = `${baseUrl}/api/blogs?populate=*`
      
      console.log('Testing Raw API URL:', url)
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setResult(data)
      console.log('Raw API Response:', data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Raw API Test Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const testSecureProxy = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    setTestType("Secure Proxy API")

    try {
      const url = new URL('/api/strapi', window.location.origin)
      url.searchParams.append('endpoint', '/blogs?populate=*&pagination[pageSize]=3')
      
      console.log('Testing Secure Proxy URL:', url.toString())
      
      const response = await fetch(url.toString(), {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`HTTP ${response.status}: ${errorData.error || response.statusText}`)
      }

      const data = await response.json()
      setResult(data)
      console.log('Secure Proxy Response:', data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('Secure Proxy Test Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">API Connection Test</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Test API Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={testBlogsApi} disabled={loading}>
                {loading && testType === "Blogs API (Client)" ? 'Testing...' : 'Test Blogs API (Client)'}
              </Button>
              <Button onClick={testCategoriesApi} disabled={loading} variant="outline">
                {loading && testType === "Categories API (Client)" ? 'Testing...' : 'Test Categories API (Client)'}
              </Button>
              <Button onClick={testTagsApi} disabled={loading} variant="outline">
                {loading && testType === "Tags API (Client)" ? 'Testing...' : 'Test Tags API (Client)'}
              </Button>
              <Button onClick={testSecureProxy} disabled={loading} variant="outline">
                {loading && testType === "Secure Proxy API" ? 'Testing...' : 'Test Secure Proxy API'}
              </Button>
              <Button onClick={testRawApi} disabled={loading} variant="outline">
                {loading && testType === "Raw API (Direct)" ? 'Testing...' : 'Test Raw API (Direct)'}
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Base URL: ${process.env.BACKEND_URL}</p>
              <p>Secure Proxy: /api/strapi</p>
              <p>Current Test: {testType || 'None'}</p>
              <p className="mt-2 text-xs">
                <strong>Note:</strong> Client API uses secure proxy, Raw API tests direct connection
              </p>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-red-50 p-4 rounded text-sm overflow-auto">
                {error}
              </pre>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>{testType} Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Response Structure: {result.blogs ? `${result.blogs.length} blogs found` : 
                    Array.isArray(result) ? `${result.length} items found` : 
                    result.data ? `${result.data.length} items found` :
                    'Single item response'}
                </p>
              </div>
              <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>API Response Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <p><strong>Expected Blog Response:</strong></p>
              <pre className="bg-gray-50 p-2 rounded text-xs">
{`{
  "data": [
    {
      "id": 4,
      "title": "Blog Title",
      "slug": "blog-slug",
      "content": "Blog content...",
      "excerpt": "Blog excerpt...",
      "readingTime": 8,
      "featured": true,
      "views": 0,
      "upvotes": 0,
      "coverImage": {
        "url": "/uploads/image.jpg",
        "formats": { ... }
      },
      "author": {
        "id": 1,
        "username": "author",
        "email": "author@example.com"
      },
      "tags": [],
      "category": null,
      "comments": [],
      "seo": { ... }
    }
  ],
  "meta": {
    "pagination": { ... }
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 