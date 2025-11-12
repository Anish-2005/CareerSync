import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Profile from '@/models/Profile'
import { verifyFirebaseToken } from '@/lib/auth-middleware'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get education data from request
    const educationData = await request.json()

    // Validate required fields
    if (!educationData.institution?.trim() || !educationData.degree?.trim() || !educationData.field?.trim() || !educationData.startDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Create new education entry
    const newEducation = {
      id: Date.now().toString(),
      institution: educationData.institution.trim(),
      degree: educationData.degree.trim(),
      field: educationData.field.trim(),
      startDate: new Date(educationData.startDate),
      endDate: educationData.current ? undefined : educationData.endDate ? new Date(educationData.endDate) : undefined,
      current: educationData.current || false,
      gpa: educationData.gpa?.trim() || '',
      description: educationData.description?.trim() || '',
    }

    // Add education to profile
    profile.education = [...(profile.education || []), newEducation]

    // Save the updated profile
    await profile.save()

    return NextResponse.json({
      success: true,
      profile,
      education: newEducation
    })

  } catch (error) {
    console.error('Error adding education:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get URL to extract education ID
    const url = new URL(request.url)
    const educationId = url.pathname.split('/').pop()

    if (!educationId) {
      return NextResponse.json({ error: 'Education ID required' }, { status: 400 })
    }

    // Get education data from request
    const educationData = await request.json()

    // Validate required fields
    if (!educationData.institution?.trim() || !educationData.degree?.trim() || !educationData.field?.trim() || !educationData.startDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Find the education to update
    const educationIndex = profile.education?.findIndex((edu: any) => edu.id === educationId)

    if (educationIndex === -1 || educationIndex === undefined) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 })
    }

    // Update the education entry
    const updatedEducation = {
      ...profile.education[educationIndex],
      institution: educationData.institution.trim(),
      degree: educationData.degree.trim(),
      field: educationData.field.trim(),
      startDate: new Date(educationData.startDate),
      endDate: educationData.current ? undefined : educationData.endDate ? new Date(educationData.endDate) : undefined,
      current: educationData.current || false,
      gpa: educationData.gpa?.trim() || '',
      description: educationData.description?.trim() || '',
    }

    // Update education in profile
    profile.education[educationIndex] = updatedEducation

    // Save the updated profile
    await profile.save()

    return NextResponse.json({
      success: true,
      profile,
      education: updatedEducation
    })

  } catch (error) {
    console.error('Error updating education:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}