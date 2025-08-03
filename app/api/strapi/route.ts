import { NextRequest, NextResponse } from 'next/server'

const STRAPI_BASE_URL = 'https://backend.blog.streaknfit.com'
const STRAPI_READ_TOKEN = process.env.STRAPI_READ_TOKEN
const STRAPI_WRITE_TOKEN = process.env.STRAPI_WRITE_TOKEN

export async function GET(request: NextRequest) {
  // Security: Require internal API secret for all operations
  const secret = request.headers.get('x-internal-api-secret')
  if (process.env.INTERNAL_API_SECRET && secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')
    const useWriteToken = searchParams.get('write') === 'true'

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 })
    }

    const token = useWriteToken ? STRAPI_WRITE_TOKEN : STRAPI_READ_TOKEN
    
    if (!token) {
      return NextResponse.json({ error: 'API token not configured' }, { status: 500 })
    }

    const url = `${STRAPI_BASE_URL}/api${endpoint}`
    
    console.log('Proxying request to:', url)

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Strapi API error:', response.status, errorText)
      return NextResponse.json(
        { error: `API request failed: ${response.status}` },
        { status: response.status }
      )
    }

    console.log('Response:', response)

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Security: Require internal API secret for write operations
  const secret = request.headers.get('x-internal-api-secret')
  if (process.env.INTERNAL_API_SECRET && secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 })
    }

    if (!STRAPI_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Write token not configured' }, { status: 500 })
    }

    const body = await request.json()
    const url = `${STRAPI_BASE_URL}/api${endpoint}`

    console.log('Proxying POST request to:', url)
    console.log('Request body:', JSON.stringify(body, null, 2))

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_WRITE_TOKEN}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Strapi API error:', response.status, errorText)
      return NextResponse.json(
        { error: `API request failed: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  // Security: Require internal API secret for write operations
  const secret = request.headers.get('x-internal-api-secret')
  if (process.env.INTERNAL_API_SECRET && secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 })
    }

    if (!STRAPI_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Write token not configured' }, { status: 500 })
    }

    const body = await request.json()
    const url = `${STRAPI_BASE_URL}/api${endpoint}`

    console.log('Proxying PUT request to:', url)

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_WRITE_TOKEN}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Strapi API error:', response.status, errorText)
      return NextResponse.json(
        { error: `API request failed: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 