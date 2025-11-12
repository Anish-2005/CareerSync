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

    const educationId = params.id

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

    console.log('Education ID being searched:', educationId)
    console.log('Education entries in profile:', profile.education?.map((edu: any) => ({ id: edu.id, institution: edu.institution })))

    if (educationIndex === -1 || educationIndex === undefined) {
      console.log('Education not found with ID:', educationId)
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