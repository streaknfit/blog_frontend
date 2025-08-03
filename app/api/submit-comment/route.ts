import { NextRequest, NextResponse } from 'next/server'
import { commentApi } from '@/lib/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Validate required fields
    const { name, email, message, blog } = body
    if (!name || !email || !message || !blog) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    // Create comment server-side (security header will be added automatically)
    const comment = await commentApi.create({ name, email, message, blog })
    return NextResponse.json({ success: true, comment })
  } catch (error) {
    console.error('Error in submit-comment API:', error)
    return NextResponse.json({ error: 'Failed to submit comment' }, { status: 500 })
  }
}