import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ status: 'ok', app: 'atlas-ops', timestamp: new Date().toISOString() })
}
