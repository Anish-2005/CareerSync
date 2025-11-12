import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Profile from '@/models/Profile'
import { verifyFirebaseToken } from '@/lib/auth-middleware'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const experienceId = params.id

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const experienceId = params.id

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Find the experience to delete
    const experienceIndex = profile.experience?.findIndex((exp: any) => exp.id === experienceId || exp.id?.toString() === experienceId?.toString())

    if (experienceIndex === -1 || experienceIndex === undefined) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }

    // Remove the experience entry
    profile.experience.splice(experienceIndex, 1)

    // Save the updated profile
    await profile.save()

    return NextResponse.json({
      success: true,
      profile
    })

  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}