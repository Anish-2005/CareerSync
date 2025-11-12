import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Profile from '@/models/Profile'
import { verifyFirebaseToken } from '@/lib/auth-middleware'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: educationId } = await params

    console.log('PUT Education API called with ID:', educationId)
    console.log('ID type:', typeof educationId)

    // Get education data from request
    const educationData = await request.json()

    console.log('Education data received:', educationData)

    // Validate required fields
    if (!educationData.institution?.trim() || !educationData.degree?.trim() || !educationData.field?.trim() || !educationData.startDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    console.log('Profile found. Education entries:', profile.education?.map((edu: any) => ({
      id: edu.id,
      institution: edu.institution,
      idType: typeof edu.id
    })))

    // Ensure all education entries have IDs (migration for old data)
    if (profile.education) {
      let needsSave = false
      profile.education = profile.education.map((edu: any) => {
        if (!edu.id) {
          needsSave = true
          return { ...edu, id: Date.now().toString() + Math.random().toString(36).substr(2, 9) }
        }
        return edu
      })
      if (needsSave) {
        await profile.save()
      }
    }

    // Find the education to update
    const educationIndex = profile.education?.findIndex((edu: any) => {
      console.log(`Comparing edu.id (${edu.id}, type: ${typeof edu.id}) with educationId (${educationId}, type: ${typeof educationId})`)
      // Try both string and number comparison in case of type mismatch
      const matches = edu.id === educationId || edu.id?.toString() === educationId?.toString()
      console.log('Match result:', matches)
      return matches
    })

    console.log('Education index found:', educationIndex)

    if (educationIndex === -1 || educationIndex === undefined) {
      console.log('Education not found - returning 404')
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()

    // Verify Firebase token
    const decodedToken = await verifyFirebaseToken(request)
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: educationId } = await params

    // Find the user's profile
    const profile = await Profile.findOne({ userId: decodedToken.uid })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Find the education to delete
    const educationIndex = profile.education?.findIndex((edu: any) => edu.id === educationId || edu.id?.toString() === educationId?.toString())

    if (educationIndex === -1 || educationIndex === undefined) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 })
    }

    // Remove the education entry
    profile.education.splice(educationIndex, 1)

    // Save the updated profile
    await profile.save()

    return NextResponse.json({
      success: true,
      profile
    })

  } catch (error) {
    console.error('Error deleting education:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}