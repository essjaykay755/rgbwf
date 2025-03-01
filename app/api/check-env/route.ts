import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Not set',
    }
    
    // Check if any required variables are missing
    const missingVars = Object.entries(envVars)
      .filter(([_, value]) => value === 'Not set')
      .map(([key]) => key)
    
    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Missing required environment variables',
        missingVars,
        envVars
      }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'All required environment variables are set',
      envVars
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Error checking environment variables',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 