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

    // Get experience data from request
    const experienceData = await request.json()

    // Validate required fields
    if (!experienceData.company?.trim() || !experienceData.position?.trim() || !experienceData.startDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Create new experience entry
    const newExperience = {
      id: Date.now().toString(),
      company: experienceData.company.trim(),
      position: experienceData.position.trim(),
      startDate: new Date(experienceData.startDate),
      endDate: experienceData.current ? undefined : experienceData.endDate ? new Date(experienceData.endDate) : undefined,
      current: experienceData.current || false,
      description: experienceData.description?.trim() || '',
      location: experienceData.location?.trim() || '',
    }

    // Add experience to profile
    profile.experience = [...(profile.experience || []), newExperience]

    // Save the updated profile
    await profile.save()

    return NextResponse.json({
      success: true,
      profile,
      experience: newExperience
    })

  } catch (error) {
    console.error('Error adding experience:', error)
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

    // Get URL to extract experience ID
    const url = new URL(request.url)
    const experienceId = url.pathname.split('/').pop()

    if (!experienceId) {
      return NextResponse.json({ error: 'Experience ID required' }, { status: 400 })
    }

    // Get experience data from request
    const experienceData = await request.json()

    // Validate required fields
    if (!experienceData.company?.trim() || !experienceData.position?.trim() || !experienceData.startDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Find the experience to update
    const experienceIndex = profile.experience?.findIndex((exp: any) => exp.id === experienceId)

    if (experienceIndex === -1 || experienceIndex === undefined) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    // Update the experience entry
    const updatedExperience = {
      ...profile.experience[experienceIndex],
      company: experienceData.company.trim(),
      position: experienceData.position.trim(),
      startDate: new Date(experienceData.startDate),
      endDate: experienceData.current ? undefined : experienceData.endDate ? new Date(experienceData.endDate) : undefined,
      current: experienceData.current || false,
      description: experienceData.description?.trim() || '',
      location: experienceData.location?.trim() || '',
    }

    // Update experience in profile
    profile.experience[experienceIndex] = updatedExperience

    // Save the updated profile
    await profile.save()

    return NextResponse.json({
      success: true,
      profile,
      experience: updatedExperience
    })

  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}